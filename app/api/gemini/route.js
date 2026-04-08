import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { getDbUser } from "@/lib/get-db-user";
import {
  buildFinanceSystemPrompt,
  getFinanceSnapshotByClerkId,
} from "@/lib/financial-chat-context";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const runtime = "nodejs";

const normalizeMessages = (messages = []) =>
  messages
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
    )
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = normalizeMessages(body?.messages);

    const { userId } = await auth();
    let financeSnapshot = null;

    if (userId) {
      await getDbUser().catch(() => null);
      financeSnapshot = await getFinanceSnapshotByClerkId(userId);
    }

    const stream = await streamText({
      model: google("gemini-2.5-flash"),
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: buildFinanceSystemPrompt(financeSnapshot, Boolean(userId)),
        },
        ...messages,
      ],
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error("Gemini API error:", error);
    return Response.json(
      { error: "Failed to generate assistant response" },
      { status: 500 }
    );
  }
}
