import ChatInterface from "./ChatInterface";

export default function FinancialAdvisor() {
  return (
    <div className="container mx-auto p-4 max-w-lg">
      <header>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Your Personal Financial Advisor
        </h1>
      </header>
      <ChatInterface />
    </div>
  );
}


