"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

import { PrivyProvider } from "@privy-io/react-auth";

type GlobalProvidersProps = {
  children: ReactNode;
};

const GlobalProviders: FC<GlobalProvidersProps> = ({ children }) => {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    throw new Error(
      "Please define the NEXT_PUBLIC_PRIVY_APP_ID environment variable inside .env.local",
    );
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#f97316",
          logo: "/logo.png",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </PrivyProvider>
  );
};

export default GlobalProviders;
