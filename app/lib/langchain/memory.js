import { BufferMemory } from "langchain/memory";

export const createChatMemory = () => {
  return new BufferMemory({
    memoryKey: "chat_history",
    returnMessages: true,
    inputKey: "input",
    outputKey: "output",
  });
};
