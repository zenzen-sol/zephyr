import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";

import { ReactNode } from "react";
import GlobalProviders from "./GlobalProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenzen Web3 Starter",
  description: "A starter for web3 projects with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.variable, GeistMono.variable, "font-sans")}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
