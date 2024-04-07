import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { accounts } from "db/schema";
import { eq } from "drizzle-orm";
import AccountsList, { Account } from "./AccountsList";
import AddAccountForm from "./AddAccountForm";
import Header from "./Header";

export default async function Home() {
  const db = await database();
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const _accounts: Account[] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  return (
    <>
      <main className="relative mx-auto max-w-5xl">
        <Header />
        <AddAccountForm />
        <AccountsList items={_accounts} />
      </main>
    </>
  );
}
