// import {streamText, Message} from "ai";
// import {createGoogleGenerativeAI} from "@ai-sdk/google";
// import { InitialMessage } from "@/lib/data";


// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY || '',
// })

// export const runtime = "edge";

// const generateId = () => Math.random().toString(36).slice(2, 15);

// const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
// {
//   id: generateId(),
//   role: "user",
//   content: InitialMessage.content
// },
//  ...messages.map((message, index) => ({
//   id: message.id || generateId(),
//   role: message.role,
//   content: message.content,
//  }))
// ]

// export async function POST(request: Request) {
//   const {messages} = await request.json();

//   const stream = await streamText({
//     model: google("gemini-1.5-flash"),
//     messages: buildGoogleGenAIPrompt(messages),
//     temperature: 0.7,
//   })
//   return stream?.toDataStreamResponse();



// }

import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { InitialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages) => [
  {
    id: generateId(),
    role: "user",
    content: InitialMessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

export async function POST(request) {
  const { messages } = await request.json();

  const stream = await streamText({
    model: google("gemini-1.5-flash"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.7,
  });

  return stream?.toDataStreamResponse();
}
