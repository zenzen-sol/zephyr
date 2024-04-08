<p><a target="_blank" href="https://app.eraser.io/workspace/oRI3IcQibkaiElPYiQDX" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

![zephyr-preview-vertical-dark.png](/.eraser/oRI3IcQibkaiElPYiQDX___knmznxcVUle1acNTsBPNYFQoztI3___0TyjJ56PsmtrAZEZnwo_M.png "zephyr-preview-vertical-dark.png")

#### Zephyr is an opinionated starter kit for web3 frontends.

Made with 🖤 in Kyoto, Japan by [﻿Sol Irvine](https://www.zenzen.io/sol)

---

### What it does

Zephyr is a useful starting point for web3 developers who are building frontend web apps that interact with on-chain services.

Out of the box, Zephyr:

- Allows a user to sign up or sign in, using any of the methods available via [﻿Clerk](https://clerk.com/docs) .
- Requires a user to submit and verify their username, full name, and email address after signing up.
- Allows a user to enter any EVM-compatible on-chain accounts. The address is verified in real-time, and any problems with the address are surfaced to the user.
- Allows a user to save a valid on-chain account to the database.
- Displays a list of saved on-chain accounts from the database. The functionality above is provided to give developers a useful jumping-off point for their own explorations and enhancements. Zephyr tries to strike the balance between showing real-world examples without being too difficult to modify to your needs.

### What's included

- A basic NextJS/Typescript app, with developer-friendly settings.
- Basic authentication with [﻿Clerk](https://clerk.com/docs) .
- [﻿Tailwind CSS](https://tailwindcss.com/) for utility class styling.
- [﻿Shadcn UI](https://ui.shadcn.com/) for UI components.
- Postgres database on [﻿Neon](https://neon.tech/) .
- [﻿Drizzle ORM](https://orm.drizzle.team/) for managing and interacting with data.

### Getting started

- Create an account on [﻿Clerk](https://clerk.com/docs) .
  - Create a new application on Clerk.
  - Save a copy of your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` somewhere secure
- Create an account on [﻿Neon](https://neon.tech/) .
  - Create a project on Neon.
  - Save a copy of the connection string for your new project somewhere secure.
- [﻿Generate a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) from this template.
- Install dependencies: `yarn install` .
- Create a file called `.env.development.local` in the project root, and add the following environment variables:

```bash
NEXT_PUBLIC_APP_NAME={Your app name}
NEXT_PUBLIC_APP_DESCRIPTION={Your app description}
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={Supplied by Clerk}
CLERK_SECRET_KEY={Supplied by Clerk}
DATABASE_URL={Your Postgres database URL from Neon}
```

- Change the project name in `package.json` to your project name.

### Setting up your database

Zephyr includes an optional data schema that illustrates how to configure and seed a database with Drizzle/Neon. The included data provides a basic representation of EVM-ecosystem chains.

This data is used to drive Zephyr's default UI, which provides users with a way to add their on-chain addresses. You may find this useful when building your own web3 app. If not, you are welcome to skip the following steps.

- For your reference, the data schema that we'll be installing is represented in the entity-relationship diagram at the end of this README. [﻿View on canvas](https://app.eraser.io/workspace/oRI3IcQibkaiElPYiQDX?elements=AqBdJp_5XgMUeEa37uVIFQ)
- You can review the code that establishes this schema in `db/schema.ts` . You are welcome to modify it to fit your app's needs.
- The seed data we'll use to populate the database is in `db/seed-fixtures.ts` . Again, feel free to enhance or modify. If you're looking for additional chains, try the [﻿ethereum-lists/chains](https://github.com/ethereum-lists/chains) project.

### Pushing seed data into your database

- To test push your schema into Neon without committing a migration, use `yarn drizzle:push` .
  - When you're ready to commit your first migration, use `yarn drizzle:generate` .
  - Note that after you commit your first migration, you'll need to commit a new migration every time you change your schema going forward.
- To see your data in Drizzle Studio, use `yarn drizzle:studio` .
  - View your database at [﻿local.drizzle.studio](https://local.drizzle.studio/) .

### Running Zephyr locally

We chose to build Zephyr with yarn, but you can substitute whatever package manager you prefer.

- Run `yarn dev` to fire up a development server.
  - If you prefer [﻿Vercel CLI](https://vercel.com/docs/cli) as your dev server, use `vercel dev` or `vc dev` instead of `yarn dev` .
- Go to [﻿http://localhost:3000](http://localhost:3000/) to see Zephyr in action. You should be prompted to sign up.

<!-- eraser-additional-content -->

### Diagrams

<!-- eraser-additional-files -->

<a href="/README-entity-relationship-1.eraserdiagram" data-element-id="g5UqCZTr5Kc3Is-Id_vZp"><img src="/.eraser/oRI3IcQibkaiElPYiQDX___knmznxcVUle1acNTsBPNYFQoztI3___---diagram----07934b1a7e5c81e5b75fc6e7865c6258.png" alt="" data-element-id="g5UqCZTr5Kc3Is-Id_vZp" /></a>

<!-- end-eraser-additional-files -->
<!-- end-eraser-additional-content -->
<!--- Eraser file: https://app.eraser.io/workspace/oRI3IcQibkaiElPYiQDX --->
