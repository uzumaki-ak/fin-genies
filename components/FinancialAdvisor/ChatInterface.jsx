//first method

// 'use client';

// import { useState } from 'react';
// import { useUser } from '@clerk/nextjs'; // Import Clerk authentication hook

// export default function ChatInterface() {
//   const { user } = useUser(); // Get logged-in user info
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     if (!user) {
//       alert('You must be logged in to send messages.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessages((prev) => [...prev, { role: 'user', content: input }]);

//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user.id, // Retrieve user ID from Clerk
//           query: input
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(errorData?.error || 'Unknown error occurred');
//       }

//       const data = await response.json();
//       setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
//       setInput('');
//     } catch (error) {
//       console.error('Chat error:', error);
//       alert(error.message || 'Failed to send message. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg shadow-md">
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.map((message, i) => (
//           <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div
//               className={`max-w-sm px-4 py-2 rounded-lg ${
//                 message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
//               }`}
//             >
//               {message.content}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Form */}
//       <form onSubmit={sendMessage} className="p-4 border-t bg-white">
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder={user ? 'Ask your financial question...' : 'Please log in to chat'}
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             disabled={loading || !user}
//           />
//           <button
//             type="submit"
//             disabled={loading || !input.trim() || !user}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 transition hover:bg-blue-600"
//           >
//             {loading ? 'Sending...' : 'Send'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


//anikesh code
// "use client"

// import { useUser, useAuth } from "@clerk/nextjs"; // Import useAuth
// import { useState } from "react";

// export default function ChatInterface() {
//   const { user } = useUser();
//   const { getToken } = useAuth(); // Get Clerk auth token
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     if (!user) {
//       alert("You must be logged in to send messages.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessages((prev) => [...prev, { role: "user", content: input }]);

//       const token = await getToken(); // Get Clerk session token

//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include token
//         },
//         body: JSON.stringify({ query: input }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(errorData?.error || "Unknown error occurred");
//       }

//       const data = await response.json();
//       setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
//       setInput("");
//     } catch (error) {
//       console.error("Chat error:", error);
//       alert(error.message || "Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg shadow-md">
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.map((message, i) => (
//           <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-sm px-4 py-2 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"}`}>
//               {message.content}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Form */}
//       <form onSubmit={sendMessage} className="p-4 border-t bg-white">
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder={user ? "Ask your financial question..." : "Please log in to chat"}
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             disabled={loading || !user}
//           />
//           <button
//             type="submit"
//             disabled={loading || !input.trim() || !user}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 transition hover:bg-blue-600"
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




// new code 


'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ChatInterface() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    try {
      setLoading(true);
      setMessages(prev => [...prev, { role: 'user', content: input }]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input,
          context: {
            riskProfile: 'moderate',
            investmentAmount: 10000,
            goals: ['retirement', 'homeownership']
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      setInput('');
    } catch (error) {
      console.error('Chat error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, i) => (
          <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-sm px-4 py-2 rounded-lg ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={user ? 'Ask your financial question...' : 'Please log in to chat'}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading || !user}
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || !user}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 transition hover:bg-blue-600"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}