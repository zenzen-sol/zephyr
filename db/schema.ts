import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

/**
 * * NOTE: This schema does not strictly conform to Ethereum's EIP155/CAIP spec.
 * * We made some adjustments to the labels and data structures to better fit
 * * the needs of this app. */

export const logoImageFormatEnum = pgEnum("logo_image_format", ["png", "svg"]);

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  address: text("address").notNull().unique(),
  name: text("name").notNull(),
  hint: text("hint"),
});

export const ecosystems = pgTable("ecosystems", {
  id: serial("id").primaryKey(),
  name: text("name"),
  ticker: text("ticker").unique(),
});

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull().unique(),
  decimals: numeric("decimals"),
});

export const chains = pgTable("chains", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  shortName: text("short_name").unique(),
  infoUrl: text("info_url"),
  interface: text("interface").notNull(),
  chainSpec: integer("chain_spec").notNull(),
  networkSpec: integer("network_spec").notNull(),
  parentChainSpec: integer("parent_chain_spec"),
  slipSpec: integer("slip_spec"),
  ensRegistry: text("ens_registry"),
  layer: text("layer"),
  ecosystemId: integer("ecosystem_id").references(() => ecosystems.id),
  nativeCoinId: integer("native_coin_id").references(() => tokens.id),
});

export const explorers = pgTable("explorers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  spec: text("spec"),
  chainId: integer("chain_id").references(() => chains.id),
});

export const accountsToChains = pgTable("accounts_to_chains", {
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id),
  chainId: integer("chain_id")
    .notNull()
    .references(() => chains.id),
});

export const chainsRelations = relations(chains, ({ many }) => ({
  explorers: many(explorers),
}));

export const explorersRelations = relations(explorers, ({ one }) => ({
  chain: one(chains, {
    fields: [explorers.chainId],
    references: [chains.id],
  }),
}));
