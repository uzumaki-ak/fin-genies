import FinancialAdvisor from './index'; // Ensure the correct import path

export default function Chatbot() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <FinancialAdvisor />
    </div>
  );
}