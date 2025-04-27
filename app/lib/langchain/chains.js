// import { RunnableSequence } from "@langchain/core/runnables";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { getSystemPrompt } from "./prompts";
// import { FinancialAnalysisTool, InvestmentAdvisorTool } from "./tools";

// export class FinancialAdvisorChain {
//   constructor() {
//     this.llm = new GoogleGenerativeAI({
//       apiKey: process.env.GEMINI_API_KEY,
//       temperature: 0.7,
//     });

//     this.tools = [new FinancialAnalysisTool(), new InvestmentAdvisorTool()];

//     // ✅ Ensure the chain uses valid Runnables
//     this.chain = RunnableSequence.from([
//       async (input) => {
//         const prompt = getSystemPrompt(input);
//         return { ...input, prompt };
//       },
//       async (input) => {
//         const response = await this.llm.generateContent(input.prompt);
//         return { text: response.text() };
//       },
//     ]);
//   }

//   async run(userId, query, context = {}) {
//     try {
//       if (!userId) {
//         throw new Error("User ID is required");
//       }

//       // Get financial analysis
//       const financialAnalysis = await this.tools[0]._call({ userId });

//       // Generate investment advice if needed
//       let investmentAdvice = null;
//       if (query.toLowerCase().includes("invest")) {
//         investmentAdvice = await this.tools[1]._call({
//           riskProfile: context.riskProfile || "moderate",
//           investmentAmount: context.investmentAmount || 0,
//           goals: context.goals || [],
//         });
//       }

//       // Prepare inputs for the LLM sequence
//       const inputs = {
//         financialAnalysis,
//         userQuery: query,
//         ...context,
//       };

//       if (investmentAdvice) {
//         inputs.investmentAdvice = investmentAdvice;
//       }

//       // ✅ Invoke the LLM sequence
//       const response = await this.chain.invoke(inputs);

//       return response.text; // Ensure proper response format
//     } catch (error) {
//       console.error("Error in advisor chain:", error);
//       throw new Error(`Error in financial advisor chain: ${error.message || error}`);
//     }
//   }
// }


//claude ai

// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { RunnableSequence } from "@langchain/core/runnables";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import { FinancialAnalysisTool, InvestmentAdvisorTool } from "./tools";

// export class FinancialAdvisorChain {
//   constructor() {
//     this.llm = new ChatGoogleGenerativeAI({
//       apiKey: process.env.GEMINI_API_KEY,
//       modelName: "gemini-pro",
//       temperature: 0.7,
//     });

//     this.tools = {
//       financialAnalysis: new FinancialAnalysisTool(),
//       investmentAdvisor: new InvestmentAdvisorTool()
//     };

//     const promptTemplate = PromptTemplate.fromTemplate(`
//       You are a sophisticated financial advisor with expertise in personal finance,
//       investment planning, budgeting, debt management, and tax planning.

//       Financial Analysis:
//       {financialAnalysis}

//       {investmentAdvice}

//       User Query: {userQuery}

//       Based on the user's financial data and query, provide specific, actionable advice.
//       Focus on practical steps they can take to improve their financial situation.
//       Use bullet points for key recommendations and explain the reasoning behind each suggestion.
//     `);

//     this.chain = RunnableSequence.from([
//       {
//         financialAnalysis: async (input) => {
//           return await this.tools.financialAnalysis._call({ userId: input.userId });
//         },
//         investmentAdvice: async (input) => {
//           if (input.userQuery.toLowerCase().includes("invest")) {
//             return await this.tools.investmentAdvisor._call({
//               riskProfile: input.context?.riskProfile || "moderate",
//               investmentAmount: input.context?.investmentAmount || 0,
//               goals: input.context?.goals || []
//             });
//           }
//           return "";
//         },
//         userQuery: (input) => input.userQuery
//       },
//       promptTemplate,
//       this.llm,
//       new StringOutputParser()
//     ]);
//   }

//   async run(userId, query, context = {}) {
//     try {
//       if (!userId) {
//         throw new Error("User ID is required");
//       }

//       const response = await this.chain.invoke({
//         userId,
//         userQuery: query,
//         context
//       });

//       return response;
//     } catch (error) {
//       console.error("Error in advisor chain:", error);
//       throw new Error(`Error in financial advisor chain: ${error.message}`);
//     }
//   }
// }


// deepseek ai 

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { FinancialAnalysisTool, InvestmentAdvisorTool } from "./tools";

export class FinancialAdvisorChain {
  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-pro",
      temperature: 0.7,
    });

    this.tools = {
      financialAnalysis: new FinancialAnalysisTool(),
      investmentAdvisor: new InvestmentAdvisorTool()
    };

    const promptTemplate = PromptTemplate.fromTemplate(`
      You are a sophisticated financial advisor with expertise in personal finance,
      investment planning, budgeting, debt management, and tax planning.

      Financial Analysis:
      {financialAnalysis}

      {investmentAdvice}

      User Query: {userQuery}

      Based on the user's financial data and query, provide specific, actionable advice.
      Focus on practical steps they can take to improve their financial situation.
      Use bullet points for key recommendations and explain the reasoning behind each suggestion.
    `);

    this.chain = RunnableSequence.from([
      {
        financialAnalysis: async (input) => {
          return await this.tools.financialAnalysis._call({ userId: input.userId });
        },
        investmentAdvice: async (input) => {
          if (input.userQuery.toLowerCase().includes("invest")) {
            return await this.tools.investmentAdvisor._call({
              userId: input.userId,
              riskProfile: input.context?.riskProfile || "moderate",
              investmentAmount: input.context?.investmentAmount || 0,
              goals: input.context?.goals || []
            });
          }
          return "";
        },
        userQuery: (input) => input.userQuery
      },
      promptTemplate,
      this.llm,
      new StringOutputParser()
    ]);
  }

  async run(userId, query, context = {}) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await this.chain.invoke({
        userId,
        userQuery: query,
        context
      });

      return response;
    } catch (error) {
      console.error("Error in advisor chain:", error);
      throw new Error(`Error in financial advisor chain: ${error.message}`);
    }
  }
}