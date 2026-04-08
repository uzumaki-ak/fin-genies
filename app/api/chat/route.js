import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDbUser } from "@/lib/get-db-user";
import {
  buildFinanceSystemPrompt,
  getFinanceSnapshotByClerkId,
} from "@/lib/financial-chat-context";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { query, context = {} } = await req.json();
    if (!query || typeof query !== "string" || !query.trim()) {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }

    await getDbUser();
    const snapshot = await getFinanceSnapshotByClerkId(userId);

    const prompt = `
${buildFinanceSystemPrompt(snapshot, true)}

Additional user context:
${JSON.stringify(context, null, 2)}

User query:
${query}
`.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return Response.json(
      {
        response: responseText,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
