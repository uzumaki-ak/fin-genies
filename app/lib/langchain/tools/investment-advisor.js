// import { Tool } from "langchain/tools";

// export class InvestmentAdvisorTool extends Tool {
//   name = "investment_advisor";
//   description =
//     "Provides investment recommendations based on user profile and market conditions";

//   async _call({ riskProfile = "moderate", investmentAmount = 0, goals = [] }) {
//     try {
//       const recommendations = this.generateRecommendations(
//         riskProfile,
//         investmentAmount,
//         goals
//       );
//       return JSON.stringify(recommendations);
//     } catch (error) {
//       console.error("Error in investment advice:", error);
//       throw new Error(`Error in investment advice: ${error.message || error}`);
//     }
//   }

//   generateRecommendations(riskProfile, amount, goals) {
//     const strategies = {
//       conservative: { bonds: 60, stocks: 30, cash: 10 },
//       moderate: { bonds: 40, stocks: 50, cash: 10 },
//       aggressive: { bonds: 20, stocks: 70, cash: 10 },
//     };

//     const allocation = strategies[riskProfile] || strategies.moderate;
//     const suggestions = this.getSuggestions(riskProfile, amount, goals);

//     return { allocation, suggestions };
//   }

//   getSuggestions(riskProfile, amount, goals) {
//     const suggestions = [];

//     if (amount < 5000) {
//       suggestions.push("Consider starting with mutual funds or ETFs.");
//     } else {
//       suggestions.push("Consider a diversified portfolio of stocks and bonds.");
//     }

//     if (goals.includes("retirement")) {
//       suggestions.push("Look into tax-advantaged retirement accounts.");
//     }

//     return suggestions;
//   }
// }



// import { Tool } from '@langchain/core/tools';

// export class InvestmentAdvisorTool extends Tool {
//   name = 'investment_advisor';
//   description = 'Provides investment recommendations based on user profile and goals';

//   constructor() {
//     super();
//   }

//   async _call(input) {
//     const { riskProfile, investmentAmount, goals } = input;
    
//     const recommendations = {
//       riskProfile,
//       suggestedAllocation: this.getAllocationByRisk(riskProfile),
//       recommendedProducts: this.getRecommendedProducts(riskProfile, investmentAmount),
//       goalAnalysis: this.analyzeGoals(goals, investmentAmount)
//     };

//     return JSON.stringify(recommendations);
//   }

//   getAllocationByRisk(riskProfile) {
//     const allocations = {
//       conservative: { stocks: 30, bonds: 60, cash: 10 },
//       moderate: { stocks: 60, bonds: 30, cash: 10 },
//       aggressive: { stocks: 80, bonds: 15, cash: 5 }
//     };
//     return allocations[riskProfile] || allocations.moderate;
//   }

//   getRecommendedProducts(riskProfile, amount) {
//     const recommendations = {
//       conservative: [
//         { type: 'Bond ETF', allocation: 60 },
//         { type: 'Dividend Stocks', allocation: 30 },
//         { type: 'Money Market', allocation: 10 }
//       ],
//       moderate: [
//         { type: 'Index Funds', allocation: 40 },
//         { type: 'Bond ETF', allocation: 30 },
//         { type: 'Growth Stocks', allocation: 20 },
//         { type: 'Cash', allocation: 10 }
//       ],
//       aggressive: [
//         { type: 'Growth Stocks', allocation: 50 },
//         { type: 'Index Funds', allocation: 30 },
//         { type: 'Bond ETF', allocation: 15 },
//         { type: 'Cash', allocation: 5 }
//       ]
//     };
//     return recommendations[riskProfile] || recommendations.moderate;
//   }

//   analyzeGoals(goals, amount) {
//     return {
//       feasibility: 'moderate',
//       timelineAnalysis: 'Based on the investment amount and goals, a 5-7 year horizon is recommended',
//       recommendations: [
//         'Consider increasing monthly investments',
//         'Diversify across recommended asset classes',
//         'Regular portfolio rebalancing recommended'
//       ]
//     };
//   }
// }



//deepseek ai
import { Tool } from '@langchain/core/tools';

export class InvestmentAdvisorTool extends Tool {
  name = 'investment_advisor';
  description = 'Provides investment recommendations based on user profile and goals';

  constructor() {
    super();
  }

  async _call(input) {
    const { userId, riskProfile, investmentAmount, goals } = input;
    if (!userId) {
      throw new Error("Unauthorized: User ID is required");
    }

    const recommendations = {
      riskProfile,
      suggestedAllocation: this.getAllocationByRisk(riskProfile),
      recommendedProducts: this.getRecommendedProducts(riskProfile, investmentAmount),
      goalAnalysis: this.analyzeGoals(goals, investmentAmount)
    };

    return JSON.stringify(recommendations);
  }

  getAllocationByRisk(riskProfile) {
    const allocations = {
      conservative: { stocks: 30, bonds: 60, cash: 10 },
      moderate: { stocks: 60, bonds: 30, cash: 10 },
      aggressive: { stocks: 80, bonds: 15, cash: 5 }
    };
    return allocations[riskProfile] || allocations.moderate;
  }

  getRecommendedProducts(riskProfile, amount) {
    const recommendations = {
      conservative: [
        { type: 'Bond ETF', allocation: 60 },
        { type: 'Dividend Stocks', allocation: 30 },
        { type: 'Money Market', allocation: 10 }
      ],
      moderate: [
        { type: 'Index Funds', allocation: 40 },
        { type: 'Bond ETF', allocation: 30 },
        { type: 'Growth Stocks', allocation: 20 },
        { type: 'Cash', allocation: 10 }
      ],
      aggressive: [
        { type: 'Growth Stocks', allocation: 50 },
        { type: 'Index Funds', allocation: 30 },
        { type: 'Bond ETF', allocation: 15 },
        { type: 'Cash', allocation: 5 }
      ]
    };
    return recommendations[riskProfile] || recommendations.moderate;
  }

  analyzeGoals(goals, amount) {
    return {
      feasibility: 'moderate',
      timelineAnalysis: 'Based on the investment amount and goals, a 5-7 year horizon is recommended',
      recommendations: [
        'Consider increasing monthly investments',
        'Diversify across recommended asset classes',
        'Regular portfolio rebalancing recommended'
      ]
    };
  }
}