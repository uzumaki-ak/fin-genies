// //corrected route.js with runnablesequence
// import { FinancialAdvisorChain } from '@/app/lib/langchain/chains';
// import { createChatMemory } from '@/app/lib/langchain/memory';
// import { auth } from '@clerk/nextjs/server'; // ✅ Import Clerk authentication

// const advisorChain = new FinancialAdvisorChain();
// const memory = createChatMemory();

// export async function POST(req) {
//   try {
//     // ✅ Get user ID from Clerk authentication
//     const { userId } = auth();
//     if (!userId) {
//       return new Response(JSON.stringify({ error: 'Unauthorized: User ID is required' }), {
//         headers: { 'Content-Type': 'application/json' },
//         status: 401
//       });
//     }

//     // ✅ Parse request body safely
//     const { query, context = {} } = await req.json();
//     if (!query) {
//       return new Response(JSON.stringify({ error: 'Query is required' }), {
//         headers: { 'Content-Type': 'application/json' },
//         status: 400
//       });
//     }

//     // ✅ Load chat history safely
//     const history = await memory.loadMemoryVariables({}) || {};
//     const chatHistory = history.chat_history || [];

//     // ✅ Generate response using new chain structure
//     const response = await advisorChain.run(userId, query, {
//       ...context,
//       chatHistory
//     });

//     // ✅ Save conversation to memory
//     await memory.saveContext({ input: query }, { output: response });

//     return new Response(JSON.stringify({ response }), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 200
//     });

//   } catch (error) {
//     console.error('Chat API error:', error);
//     return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 500
//     });
//   }
// }


//claude ai
// import { FinancialAdvisorChain } from '@/app/lib/langchain/chains';
// import { auth } from '@clerk/nextjs/server';

// const advisorChain = new FinancialAdvisorChain();

// export async function POST(req) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return new Response(
//         JSON.stringify({ error: 'Unauthorized' }), 
//         { status: 401 }
//       );
//     }

//     const { query, context = {} } = await req.json();
//     if (!query) {
//       return new Response(
//         JSON.stringify({ error: 'Query is required' }), 
//         { status: 400 }
//       );
//     }

//     const response = await advisorChain.run(userId, query, context);

//     return new Response(
//       JSON.stringify({ response }), 
//       { 
//         headers: { 'Content-Type': 'application/json' },
//         status: 200 
//       }
//     );

//   } catch (error) {
//     console.error('Chat API error:', error);
//     return new Response(
//       JSON.stringify({ error: error.message || 'Internal Server Error' }), 
//       { 
//         headers: { 'Content-Type': 'application/json' },
//         status: 500 
//       }
//     );
//   }
// }

//deepseek ai

import { FinancialAdvisorChain } from '@/app/lib/langchain/chains';
import { auth } from '@clerk/nextjs/server';

const advisorChain = new FinancialAdvisorChain();

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401 }
      );
    }

    const { query, context = {} } = await req.json();
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }), 
        { status: 400 }
      );
    }

    const response = await advisorChain.run(userId, query, context);

    return new Response(
      JSON.stringify({ response }), 
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }), 
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
}