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
- Next.js 15 (App Router)
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
