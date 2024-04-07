import { database } from "@/lib/database";
import { accounts } from "db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import AccountsList, { Account } from "./AccountsList";
import AddAccountForm from "./AddAccountForm";
import Header from "./Header";

export default async function Home() {
  const db = await database();

  const cookieStore = cookies();
  const accessToken = cookieStore.get("privy-token");
  console.debug({ accessToken });

  // if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
  //   throw new Error("NEXT_PUBLIC_PRIVY_APP_ID not found.");
  // }

  // if (!process.env.PRIVY_APP_SECRET) {
  //   throw new Error("PRIVY_APP_SECRET not found.");
  // }

  // if (!accessToken || !accessToken?.value) {
  //   throw new Error("Access token not found.");
  // }

  // const privy = new PrivyClient(
  //   process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  //   process.env.PRIVY_APP_SECRET,
  // );
  // const verifiedClaims = await privy.verifyAuthToken(`${accessToken.value}`);
  // console.debug({ verifiedClaims });

  const _accounts: Account[] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, "did:privy:clu7ty42p000v6kw2d5s858j1"));

  return (
    <main className="mx-auto max-w-5xl">
      <Header />
      <AddAccountForm />
      <AccountsList items={_accounts} />
    </main>
  );
}
