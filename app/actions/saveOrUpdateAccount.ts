"use server";

import { database } from "@/lib/database";
import { accounts, accountsToChains, chains } from "db/schema";
import { eq } from "drizzle-orm";

export const saveOrUpdateAccount = async (values: {
  address: string;
  name: string;
  userId: string;
}) => {
  const db = await database();
  const _chains = await db
    .select()
    .from(chains)
    .where(eq(chains.shortName, "eth"))
    .limit(1);

  const chain = _chains?.[0];

  const _accounts = await db
    .insert(accounts)
    .values({
      name: values.name,
      address: values.address,
      userId: values.userId,
    })
    .onConflictDoUpdate({
      target: accounts.address,
      set: {
        address: values.address,
        name: values.name,
        userId: values.userId,
      },
    })
    .returning();

  const account = _accounts?.[0];

  if (!account?.id) {
    throw new Error("Account not found.");
  }

  if (!chain?.id) {
    throw new Error("Chain not found.");
  }

  await db
    .insert(accountsToChains)
    .values({
      accountId: account.id,
      chainId: chain.id,
    })
    .onConflictDoNothing();

  return account;
};
