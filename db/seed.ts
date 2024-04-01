// src/db/seed.ts
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { chains, ecosystems, explorers, tokens } from "./schema";
import { chainFixtures } from "./seed-fixtures";

dotenv.config({ path: "./.env.development.local" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development.local");

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);

  // console.debug({ chainFixtures });

  console.debug("Seed start");

  // Create the EVM ecosystem if it doesn't exist.
  const existingEvmEcosystems: (typeof ecosystems.$inferSelect)[] = await db
    .select()
    .from(ecosystems)
    .where(eq(ecosystems.ticker, "evm"));
  let _evmEcosystemId: number | undefined = existingEvmEcosystems?.[0]?.id;

  if (!_evmEcosystemId) {
    const newEthEcosystems: (typeof ecosystems.$inferInsert)[] = await db
      .insert(ecosystems)
      .values({
        name: "Ethereum",
        ticker: "evm",
      })
      .onConflictDoNothing()
      .returning();
    if (newEthEcosystems?.[0]?.id) {
      _evmEcosystemId = newEthEcosystems[0].id;
    }
  }

  // Iterate over chain fixtures to create seed data.
  const seedJobs = chainFixtures.map(async (_cf: any) => {
    // Create the new chain's native coin, if it doesn't exist.
    const _tf = _cf.nativeCoin;

    const existingTokens: (typeof tokens.$inferSelect)[] = await db
      .select()
      .from(tokens)
      .where(eq(tokens.symbol, _tf.symbol));
    let _tokenId = existingTokens?.[0]?.id;

    if (!_tokenId) {
      const _token = await db
        .insert(tokens)
        .values({
          name: _tf.name,
          symbol: _tf.symbol,
          decimals: _tf.decimals,
        })
        .onConflictDoUpdate({
          target: tokens.symbol,
          set: {
            name: _tf.name,
            decimals: _tf.decimals,
          },
        })
        .returning();
      _tokenId = _token[0].id;
    }

    // Create the new chain.
    const _chain = await db
      .insert(chains)
      .values({
        name: _cf.name,
        shortName: _cf.shortName,
        infoUrl: _cf.infoUrl,
        interface: _cf.interface,
        layer: _cf.layer,
        chainSpec: _cf.chainSpec,
        networkSpec: _cf.networkSpec,
        parentChainSpec: _cf.parentChainSpec,
        slipSpec: _cf.slipSpec,
        ensRegistry: _cf.ensRegistry,
        ecosystemId: _evmEcosystemId,
        nativeCoinId: _tokenId,
      })
      .onConflictDoUpdate({
        target: chains.name,
        set: {
          infoUrl: _cf.infoUrl,
          interface: _cf.interface,
          layer: _cf.layer,
          chainSpec: _cf.chainSpec,
          networkSpec: _cf.networkSpec,
          parentChainSpec: _cf.parentChainSpec,
          slipSpec: _cf.slipSpec,
          ensRegistry: _cf.ensRegistry,
          ecosystemId: _evmEcosystemId,
          nativeCoinId: _tokenId,
        },
      })
      .returning();
    const _chainId = _chain[0].id;

    _cf.explorers.map(async (_e: any) => {
      await db
        .insert(explorers)
        .values({
          name: _e.name,
          url: _e.url,
          spec: _e.spec,
          chainId: _chainId,
        })
        .onConflictDoUpdate({
          target: explorers.url,
          set: {
            name: _e.name,
            spec: _e.spec,
            chainId: _chainId,
          },
        });
    });
  });

  // Create the new chain's explorer links.
  await Promise.all(seedJobs);
  console.debug("Seed done");
};

try {
  main();
} catch (e: unknown) {
  console.error("error: ", e);
}
