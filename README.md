<p><a target="_blank" href="https://app.eraser.io/workspace/oRI3IcQibkaiElPYiQDX" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# Zephyr

Zephyr is an opinionated starter kit for web3 projects. It includes:

- A basic NextJS/Typescript app, with developer-friendly settings.
- Basic authentication with [﻿Privy.io](https://www.privy.io/) .
- [﻿Tailwind CSS](https://tailwindcss.com/) for utility class styling.
- [﻿Shadcn UI](https://ui.shadcn.com/) for UI components.
- Postgres database on [﻿Neon](https://neon.tech/) .
- [﻿Drizzle ORM](https://orm.drizzle.team/) for managing and interacting with data.

### Getting started

- Create an account on [﻿Privy.io](https://www.privy.io/) .
- Create an account on [﻿Neon](https://neon.tech/) .
- [﻿Generate a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) from this template.
- Install dependencies: `yarn install`.
- Create a file called `.env.development.local` in the project root, and add the following environment variables:

```bash
NEXT_PUBLIC_APP_NAME=<Your app name>
NEXT_PUBLIC_APP_DESCRIPTION=<Your app description>
NEXT_PUBLIC_PRIVY_APP_ID=<Supplied by Privy>
DATABASE_URL=<Your postgres database url from Neon>
```

- Change the project name in `package.json` to your project name.
- Run the development server: `yarn dev` .

### Seed Data

Zephyr includes an optional data schema that illustrates how to configure and seed a database with Drizzle/Neon. The included data provides a basic representation of EVM-ecosystem chains.

This data is used to drive Zephyr's default UI, which provides users with a way to add their on-chain addresses. You may find this useful when building your own web3 app. If not, you are welcome to skip the following steps.

- For your reference, the data schema that we'll be installing is represented in this entity-relationship diagram. [﻿View on canvas](https://app.eraser.io/workspace/oRI3IcQibkaiElPYiQDX?elements=AqBdJp_5XgMUeEa37uVIFQ)
- You can review the code that establishes this schema in `db/schema.ts` . You are welcome to modify it to fit your app's needs.
- The seed data we'll use to populate the database is in `db/seed-fixtures.ts` . Again, feel free to enhance or modify. If you're looking for additional chains, try the [﻿ethereum-lists/chains](https://github.com/ethereum-lists/chains) project.
- When you're ready to commit your first migration, use `yarn drizzle:generate` . If you want to test push your schema into Neon without committing a migration, use `yarn drizzle:push` .
- To see your data in Drizzle Studio, use `yarn drizzle:studio` . You should be able to view your database at [﻿local.drizzle.studio](https://local.drizzle.studio/) .

### Running Zephyr locally

Zephyr comes with a simple UI for entering on-chain addresses. The UI provides a text input that validates the address entered by the user. Validation will either:

- Pass and allow the user to save the address to the `accounts` table.
- Fail due to incorrect checksum. The user will be prompted to fix the checksum.
- Fail due to non-compliant format. If the address doesn't match the criteria for a valid EVM address, the user will see an error and won't be able to save it.

<!--- Eraser file: https://app.eraser.io/workspace/oRI3IcQibkaiElPYiQDX --->
