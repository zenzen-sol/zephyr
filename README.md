
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
2. [Generate a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) from this template.
3. Install dependencies: `yarn install`
4. Create a file called `.env.development.local` in the project root, and add the following environment variables:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=<Supplied by Privy>
DATABASE_URL=<Your postgres database url from Neon>
```