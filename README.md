# usrtnr

A modern URL shortener that transforms long web addresses into short, memorable, and shareable links with ease. Built with Next.js, Prisma, Supabase, and Tailwind CSS. Supports distributed systems by using the Twitter Snowflake algorithm for unique, scalable ID generation.

## Features

- 🔗 Shorten long URLs into easy-to-share links
- 📊 Analytics dashboard: track visits, browsers, countries, and trends for each link
- 🌍 Geographic heatmap and country breakdown for link visits
- 👤 User accounts: sign up, log in, and manage your URLs
- 🔒 Toggle analytics on/off for each URL
- 🗑️ Delete and manage your short URLs
- 🎨 Beautiful, responsive UI with dark mode
- ⚡ Unique IDs generated using the Twitter Snowflake algorithm for scalability

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd usrtnr
```

### 2. Install dependencies

```bash
pnpm install # or npm install, yarn install, bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following:

```
# PostgreSQL database
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
DATABASE_DIRECT_URL=postgresql://<user>:<password>@<host>:<port>/<db>

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# (Optional) Snowflake worker ID for unique ID generation
WORKER_ID=1

# (Optional) Base URL for short links
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Set up the database

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev --name init
```

### 5. Start the development server

```bash
pnpm dev # or npm run dev, yarn dev, bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

## Usage

- **Shorten a URL:** Paste a long URL on the homepage and get a short link instantly.
- **Sign up / Log in:** Create an account to manage your links and view analytics.
- **Dashboard:** View, analyze, and manage all your short URLs in one place.
- **Analytics:** See visit counts, browser breakdown, country stats, and trends for each link.
- **Password reset:** Forgot your password? Use the reset link on the login page.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Prisma](https://www.prisma.io/) ORM
- [Supabase](https://supabase.com/) Auth & Database
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- Twitter Snowflake algorithmfor distributed, unique ID generation

## License

MIT
