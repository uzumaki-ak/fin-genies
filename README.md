# Finance Mang

AI-powered personal finance manager built with Next.js, Clerk, Prisma, Supabase, and Gemini.

## Features
- Multi-account finance tracking (current/savings)
- Income and expense transaction management
- Recurring transaction support
- Budget setup and monthly usage tracking
- Dashboard insights with charts
- Receipt scanner with Gemini extraction
- AI finance assistant with user-specific DB context
- Authentication via Clerk

## Tech Stack
- Next.js 16 (App Router)
- React 19 + Tailwind CSS + shadcn/ui
- Prisma ORM
- PostgreSQL (Supabase)
- Clerk (Auth)
- Gemini (`gemini-2.5-flash`)
- Arcjet (rate limiting / bot protection)
- Inngest (background jobs)

## Prerequisites
- Node.js 20+
- npm (or pnpm/yarn/bun)
- A PostgreSQL database (Supabase recommended)
- Clerk project keys
- Gemini API key

## Getting Started
1. Clone and install dependencies
```bash
git clone https://github.com/uzumaki-ak/fin-genies.git
cd fin-genies
npm install
```

2. Create environment file
```bash
cp .env.example .env
```
Fill all required values.

3. Generate Prisma client
```bash
npx prisma generate
```

4. Run migrations
```bash
npx prisma migrate deploy
```
For local dev-only workflows, `npx prisma db push` is also acceptable.

5. Start development server
```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts
- `npm run dev` - Start development server (Turbopack)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run lint checks

## Environment Variables
See [.env.example](./.env.example).

Main required keys:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`
- `DIRECT_URL`
- `GEMINI_API_KEY`
- `ARCJET_KEY`
- `RESEND_API_KEY`

## Notes
- If you use Supabase pooler, include:
  - `pgbouncer=true`
  - `connection_limit=1`
  - `sslmode=require`
- Use direct DB host for `DIRECT_URL` (migrations).

## Project Structure
```text
app/                Next.js routes, pages, API routes
actions/            Server actions
components/         UI and feature components
lib/                Prisma/auth/helpers/inngest
prisma/             Prisma schema and migrations
data/               Static data/config
```

## License
Private/internal project.

## Research Work Documentation (Preserved)

Research work Documentation done :

Gaps in the Finance Industry & What Major Players Lack(How are we different from our competitors)
The finance industry in India is fragmented, with companies specializing in different aspects (credit cards, investments, loans, or budgeting). However, no single player provides a comprehensive, AI-driven financial ecosystem that automates personal finance end-to-end. Here are the major gaps:

1. Lack of AI-Driven Personalized Financial Planning
🔹 Problem: Most finance apps provide generic investment options but lack personalized financial advice tailored to an individual’s spending habits, income, and goals.
🔹 Current Players & Their Gaps:
•	CRED: Only rewards credit card payments, no investment guidance.
•	Groww & Paytm Money: Provide investment platforms but no personal financial coaching.
•	INDmoney: Tracks investments but doesn’t guide users on where to invest based on financial goals.
🔹 Market Need:
An AI-driven system that analyzes spending, income, and investment patterns to provide real-time, customized financial planning.

2. No End-to-End Automated Expense & Investment Management
🔹 Problem: Users need to manually track expenses in one app (e.g., Walnut, MoneyView), invest in another (e.g., Groww, Paytm Money), and manage credit in a third (e.g., CRED).
🔹 Current Players & Their Gaps:
•	CRED: Credit-focused, doesn’t track income & expenses.
•	ET Money: Tracks mutual funds but doesn’t track daily expenses.
•	Groww & Paytm Money: Focus on investing but do not track personal spending or provide budgeting.
🔹 Market Need:
A unified platform that automatically categorizes expenses, tracks investments, and provides real-time financial insights in one place.

3. No AI-Based Tax Optimization & Automated Tax Filings
🔹 Problem: Most people overpay taxes due to a lack of knowledge about tax-saving investment options and deductions.
🔹 Current Players & Their Gaps:
•	ET Money & INDmoney: Show tax-saving investment options but do not provide real-time, AI-based tax optimization or automated tax filing.
•	Groww & Paytm Money: Focus on investment but don’t integrate tax-saving suggestions automatically.
🔹 Market Need:
A system that tracks user income, spending, and investments to automatically calculate tax liability, recommend deductions, and file taxes.

4. Lack of AI-Powered Stock Advisory & Portfolio Rebalancing
🔹 Problem: New investors struggle to select stocks and balance their portfolios. Most apps only provide buy/sell options but don’t actively guide investors based on market trends.
🔹 Current Players & Their Gaps:
•	Groww & Paytm Money: Allow stock investing but don’t provide AI-driven investment advice.
•	INDmoney: Tracks stocks but doesn’t offer active portfolio rebalancing based on changing market conditions.
🔹 Market Need:
A real-time AI-driven advisory system that analyzes market trends and automatically suggests portfolio adjustments based on user preferences and risk appetite.

5. No AI-Driven Loan & Credit Score Optimization
🔹 Problem: People struggle to improve credit scores and get the best loan deals. Existing apps only show credit scores but don’t actively guide users on how to improve them or qualify for better loans.
🔹 Current Players & Their Gaps:
•	CRED: Shows credit scores and rewards bill payments but doesn’t suggest ways to improve creditworthiness.
•	Navi & INDmoney: Offer loans but don’t analyze user credit history to provide personalized loan strategies.
🔹 Market Need:
A system that analyzes spending, loan payments, and income patterns to provide:
✅ Personalized loan recommendations based on eligibility
✅ AI-driven insights on how to improve credit scores
✅ Alerts for best loan opportunities based on credit profile

6. No Comprehensive Multi-Account Management for Families & Small Businesses
🔹 Problem: Users can’t manage multiple accounts (personal, joint, business, savings, investments) in a single app.
🔹 Current Players & Their Gaps:
•	Walnut & MoneyView: Track personal expenses but do not allow multiple account management.
•	ET Money & INDmoney: Track investments but lack household expense tracking.
🔹 Market Need:
A multi-account financial dashboard for families and small businesses that enables:
✅ Budgeting across different accounts
✅ Family-wide financial management
✅ Small business income/expense tracking

7. No Unified Finance Automation for Investments, Savings & Emergency Funds
🔹 Problem: Users struggle to allocate money between emergency funds, savings, and investments because existing apps only focus on one aspect.
🔹 Current Players & Their Gaps:
•	Groww & Paytm Money: Focus on investments but don’t help users balance savings vs. investing.
•	ET Money: Shows savings but doesn’t automate goal-based financial planning.
🔹 Market Need:
A finance automation tool that dynamically adjusts:
✅ Emergency funds based on spending patterns
✅ Auto-invests surplus money into the best asset classes
✅ Allocates money between savings, expenses, and investments intelligently

8. No Real-Time Smart Budgeting & Overspending Alerts
🔹 Problem: People overspend because they don’t get real-time alerts when crossing their budget.
🔹 Current Players & Their Gaps:
•	MoneyView & Walnut: Manually track expenses but don’t provide real-time overspending alerts.
•	ET Money & INDmoney: Focus on investment tracking but do not track daily spending habits.
🔹 Market Need:
A smart budgeting tool that uses AI to:
✅ Set dynamic budgets based on income & expenses
✅ Send real-time alerts when spending reaches critical limits
✅ Suggest alternative ways to cut expenses

Conclusion: Major Gaps in the Finance Industry
Key Problem	Players in the Market	What They Lack	What’s Needed
No AI-driven financial planning	CRED, Groww, Paytm Money, INDmoney	No personalized financial guidance	AI-driven financial coaching
No end-to-end finance management	CRED, ET Money, Groww, INDmoney	Fragmented solutions, no all-in-one tracking	Unified expense + investment + loan tracking
No tax optimization	ET Money, INDmoney, Groww	No automated tax-saving strategies	AI-driven tax calculations & filing
No AI-powered stock advisory	Groww, Paytm Money, INDmoney	No portfolio rebalancing & real-time insights	AI-based stock recommendations & risk analysis
No credit score optimization	CRED, Navi	No loan strategy suggestions	AI-based credit score improvement plans
No multi-account management	Walnut, MoneyView, ET Money	No support for family & business accounts	Multi-account financial dashboard
No automated investment & savings balancing	Groww, Paytm Money	No smart allocation between savings & investments	AI-driven fund allocation & auto-investing
No real-time overspending alerts	MoneyView, Walnut, INDmoney	No dynamic budget monitoring	AI-powered spending alerts & financial adjustments




🎯 Target Market for Your Finance Management App
Your app caters to multiple user groups based on age, income, financial habits, and occupation. Below is a detailed segmentation of your target market:

📌 1. Age-Based Segmentation
Age Group	Who They Are?	Needs & Features
18-25 Years (College Students & Young Professionals)	Students, Interns, Entry-Level Employees	💰 Smart pocket money tracking, 🎓 Education loan & EMI planning, 🏠 Rent & expense splitting, 🎮 Gamified savings challenges, 👨‍💻 Freelance job matchmaking
25-40 Years (Working Professionals & Young Investors)	Salaried Employees, First-Time Investors	📊 Budgeting & expense tracking, 📈 AI-based stock investment suggestions, 💳 Credit score improvement, 🏦 Loan & tax advisory
40-55 Years (Mid & Senior Professionals, Business Owners)	Experienced Professionals, Entrepreneurs	📈 Advanced investment tracking, 🏡 Multi-account finance management (personal & business), ⚖️ Tax-saving recommendations, 🔄 Portfolio rebalancing
55+ Years (Retirees & Wealth Managers)	Retired Individuals, High Net-Worth Investors	🏦 Wealth preservation & passive income tracking, 📊 Retirement planning, 💼 Estate & tax management


📌 2. Income-Based Segmentation
Income Level	Target Users	Key Features for Them
₹3L - ₹10L per year	College students, freelancers, entry-level employees	🏦 Expense tracking, 💰 Smart savings, 🎓 Loan planning, 🏠 Rent & bill splitting
₹10L - ₹30L per year	Mid-level professionals, early-stage entrepreneurs	📊 Budget alerts, 📈 Investment tracking, 💳 Credit score monitoring, ⚖️ Tax optimization
₹30L - ₹1Cr per year	Senior professionals, business owners, investors	🏡 Personal & business finance management, 💼 Automated tax planning, 📊 Portfolio rebalancing
₹1Cr+ per year	High-net-worth individuals (HNWI), global investors	💰 Wealth & estate planning, 🌍 International tax advisory, 📈 AI-powered stock recommendations


📌 3. Occupation-Based Segmentation
Occupation	Pain Points & Needs	Solution Features
College Students & Youngsters (18-25 years)	Poor financial planning, overspending, difficulty saving	🎓 Smart pocket money tracker, 💰 Gamified savings, 🏠 Rent/expense splitting
Salaried Professionals (25-45 years)	Struggles with budgeting, tax savings, investments	📊 Budget alerts, 🏦 Multi-account finance, 📈 Investment guidance
Freelancers & Gig Workers (22-40 years)	Irregular income, tax confusion, difficulty tracking payments	💰 Income tracking, 📊 Tax automation, 👨‍💻 AI-powered job recommendations
Business Owners & Entrepreneurs (30-55 years)	Mixing personal & business expenses, cash flow issues, high tax burdens	💼 Business vs. personal finance management, ⚖️ Smart tax deductions, 📈 Investment rebalancing
First-Time Investors (22-35 years)	No financial knowledge, afraid of losses	📈 AI-driven stock & mutual fund suggestions, 🔄 SIP calculators, 🎯 Risk analysis
High-Net-Worth Individuals (HNWIs, 40+ years)	Need wealth preservation, estate planning	💰 Automated tax optimization, 🌍 Global finance tracking, 🏦 Retirement & estate advisory


📌 4. Geography-Based Segmentation
Region	Who They Are?	Features Needed
Tier 1 & Metro Cities (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, etc.)	High-earning professionals, business owners, investors	📊 Investment tracking, 💳 Loan & credit score management, 📈 Stock advisory
Tier 2 & 3 Cities (Indore, Jaipur, Lucknow, Patna, Chandigarh, etc.)	Emerging middle-class professionals, small business owners	💰 Expense tracking, 🏦 Tax-saving investment suggestions, 🔄 SIP calculators
NRI & Global Investors	NRIs managing Indian investments, foreign investors	🌍 International tax planning, 🏦 Cross-border wealth management, 📈 Investment insights


📌 5. Financial Behavior Segmentation
Financial Behavior	Problems They Face	Solution Features
Budget-Conscious Users	Struggle to track daily expenses, overspend	📊 Budgeting & alert system, 💳 AI-driven savings tracker
Investment-Oriented Users	Need guidance on where to invest, fear losses	📈 AI-powered investment suggestions, 🔄 SIP & portfolio tracking
Debt & Credit Score Improvers	Have loans, need better financial discipline	💳 Loan & EMI tracking, ⚖️ AI-based credit score improvement
Wealth Accumulators	Looking for long-term financial growth	🏦 Tax-efficient wealth planning, 📊 Retirement fund tracking


📌 Summary: Who is Your Ideal User?
🎯 Most Active & Profitable Users:
✔ Young Professionals (22-40 years, ₹4L - ₹30L income) – Need budgeting, investment guidance, and tax savings.
✔ Business Owners (30-55 years, ₹15L - ₹1Cr income) – Need cash flow management, tax optimization, and investment tracking.
✔ College Students (18-25 years, ₹3L+ family income) – Need smart spending, savings tracking, and financial literacy.
🚀 Biggest Opportunity: Young working professionals & mid-income earners in Tier 1 & Tier 2 cities who struggle with financial planning.














How Investment Works: A Deep Dive
Investment is not just about buying assets; it's about strategic capital allocation based on risk, return, liquidity, and market dynamics. Investment strategies are shaped by modern portfolio theory (MPT), behavioral finance, and AI-driven financial modeling.
Key Investment Principles:
1.	Risk-Return Tradeoff – Higher risk brings higher potential returns (e.g., stocks), while lower risk offers stability (e.g., bonds).
2.	Diversification – Spreading investments across asset classes (stocks, bonds, real estate, commodities) reduces risk.
3.	Time Value of Money (TVM) – Money today is worth more than money in the future due to inflation and compounding.
4.	Asset Allocation – Balancing assets based on the investor’s age, risk appetite, and financial goals.
5.	Behavioral Finance – Investors are irrational; emotions (fear, greed) influence decisions. AI can help mitigate biases.

Applying This to Your Finance Management App
Since your app tracks expenses and income, you can integrate AI-driven investment planning using real-time data analytics. Here's a structured solution:
1. AI-Powered Investment Profiling
•	Use spending patterns and savings behavior to classify users into risk profiles:
◦	Conservative – Prefers safe investments (FDs, debt funds, bonds).
◦	Moderate – Open to balanced funds, blue-chip stocks, and hybrid mutual funds.
◦	Aggressive – Comfortable with high-risk assets (stocks, crypto, startups).
•	Collect user inputs (age, income, financial goals) and cross-analyze with spending patterns.
2. Smart Surplus Allocation
•	If a user saves >20% of income, suggest SIP investments for long-term growth.
•	If a user gets a bonus or windfall, suggest lump sum investment plans like ETFs or stocks.
•	Auto-detect irregular spending spikes and recommend emergency fund top-ups.
3. Personalized Investment Recommendations
•	Goal-Based Investing:
◦	Buying a house? Suggest real estate mutual funds, REITs, long-term debt funds.
◦	Retirement planning? Recommend NPS, index funds, annuities.
◦	Wealth creation? Propose SIP in equity mutual funds, stock portfolios.
•	Tax Optimization:
◦	If taxable income > ₹10L, suggest ELSS, PPF, NPS for tax savings.
◦	Show estimated tax benefits from suggested investments.
4. AI-Powered Market Insights
•	Integrate stock market & economic indicators for dynamic investment advice.
•	Use sentiment analysis & AI predictions to suggest when to buy/sell stocks.
5. Graphical & Predictive Analytics
•	Show compounding projections for SIPs.
•	Provide a "What-If" calculator to show how small investments grow over time.
•	Display risk vs. return charts based on asset allocation.

Final Implementation Strategy
1.	Data Collection – Track expenses, income, and savings behavior.
2.	AI Model Training – Use machine learning to analyze financial patterns.
3.	Recommendation Engine – Suggest investment plans based on behavior & market conditions.
4.	Automation & Notifications – Auto-invest spare cash or alert users when an investment opportunity arises.
By integrating these elements, your app can act as a financial planner, providing users with personalized, data-driven investment strategies that optimize wealth creation while managing risk. 🚀















Features & Real-Life Problem Solving in India
1. Multi-Account Financial Management
🔹 Problem in India: Many individuals mix savings, expenses, and investment money, leading to poor financial planning.
🔹 Real-Life Scenario: Ramesh saves for a bike but ends up using the money for household expenses.
🔹 Solution: Our app allows users to create separate accounts for goals, ensuring disciplined savings.
2. AI-Powered Bill Scanning & Expense Tracking
🔹 Problem in India: People lose track of cash-based expenses and bills, making budgeting difficult.
🔹 Real-Life Scenario: Priya forgets about her grocery and utility expenses, overspending by month-end.
🔹 Solution: Users can upload bill photos, and AI automatically categorises and records expenses.
3. Smart Budgeting with Alert System
🔹 Problem in India: Many struggle with budgeting and unknowingly overspend.
🔹 Real-Life Scenario: Amit sets a ₹10,000 budget but realises too late that he has spent ₹12,000.
🔹 Solution: Our app sends alerts when 90% of the budget is reached, preventing overspending.
4. Personalised AI Chatbot for Financial Assistance
🔹 Problem in India: People rely on unreliable financial advice or struggle to find guidance.
🔹 Real-Life Scenario: Sanya wants to invest but gets conflicting advice from friends and online sources.
🔹 Solution: Our AI chatbot provides personalized, data-driven financial guidance.
5. Stock Market Investment Tracking with Graphical Insights
🔹 Problem in India: Investors lack real-time tracking, leading to losses.
🔹 Real-Life Scenario: Raj invests in stocks but forgets to track them, missing key selling points.
🔹 Solution: Our app visually tracks investments, helping users make informed decisions.
6. Tax Calculation & Investment Recommendations
🔹 Problem in India: Many overpay taxes due to a lack of awareness about exemptions.
🔹 Real-Life Scenario: Anil doesn’t claim tax deductions on investments, paying extra tax.
🔹 Solution: Our app calculates taxes and suggests the best tax-saving investments.
7. Monthly Spending Analysis & Feedback
🔹 Problem in India: People don’t analyze their monthly spending patterns, leading to poor financial habits.
🔹 Real-Life Scenario: Neha earns well but has no savings at the end of the month because she doesn't track spending patterns.
🔹 Solution: Our app provides monthly spending reports with AI-driven insights and suggestions to optimize expenses.
8. Credit Card & Loan EMI Management
🔹 Problem in India: Many people miss EMI payments due to poor tracking, leading to penalties and lower credit scores.
🔹 Real-Life Scenario: Rohan forgets to pay his credit card bill, incurring a late fee and increased interest.
🔹 Solution: The app reminds users of upcoming EMIs and credit card payments to avoid penalties.
9. Automated Goal-Based Savings
🔹 Problem in India: People find it difficult to save consistently for specific goals.
🔹 Real-Life Scenario: Meera wants to buy a laptop but never sets aside enough money due to impulsive spending.
🔹 Solution: Our app allows users to set financial goals, automating savings by allocating a fixed amount each month.
10. Cash Flow Forecasting
🔹 Problem in India: Salaried employees and freelancers struggle to manage income and expenses effectively.
🔹 Real-Life Scenario: Arjun, a freelancer, earns irregularly and struggles to predict how much he can spend each month.
🔹 Solution: The app predicts cash flow based on past income and expenses, helping users plan ahead.
11. SIP Calculator
🔹 Problem in India: People struggle to plan long-term investments systematically.
🔹 Real-Life Scenario: Kavita wants to save for her child's education but doesn’t know how much to invest monthly.
🔹 Solution: Our SIP calculator helps users plan investments based on their goals.
12. Stock Advisory Feature
🔹 Problem in India: Many new investors don’t know which stocks to buy or sell.
🔹 Real-Life Scenario: Vinay invests in random stocks based on tips, incurring losses.
🔹 Solution: Our AI-driven advisory provides stock recommendations based on market trends.
Our app directly addresses India’s financial challenges, making financial management easy, automated, and efficient. 🚀

