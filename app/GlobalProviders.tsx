"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

type GlobalProvidersProps = {
  children: ReactNode;
};

const GlobalProviders: FC<GlobalProvidersProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default GlobalProviders;
