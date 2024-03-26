
# Zenzen Web3 Starter App

A starter for web3 projects with Next.js. It includes:

- [x] Basic authentication with [Privy.io](https://www.privy.io)
- [x] [Tailwind CSS](https://tailwindcss.com)
- [x] [Shadcn UI](https://ui.shadcn.com)
- [x] Postgres database with [Neon](https://neon.tech)
- [x] [Drizzle ORM](https://orm.drizzle.team)

## Getting started

0. Create an account on [Privy.io](https://www.privy.io)
1. Create an account on [Neon](https://neon.tech)
2. Clone the repository
3. Install the dependencies: `yarn install`
4. Configure `.env.development.local` file

```bash
# Assumes you're using privy.io for authentication & user management
NEXT_PUBLIC_PRIVY_APP_ID=<Supplied by Privy>
DATABASE_URL=<Your postgres database url from Neon>
```