"use client";

import { IconWallet } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { FC } from "react";

export type Account = {
  id: number;
  address: string;
  name: string;
  userId: string;
  hint: string | null;
};

type AccountsListProps = {
  items: Account[];
};

const AccountsList: FC<AccountsListProps> = ({ items }) => {
  const { isLoaded } = useAuth();

  return (
    <div
      className={cn(
        "mx-auto w-full text-sm md:w-1/2 md:max-w-none",
        !isLoaded && "pointer-events-none opacity-30",
      )}
    >
      <div className="mx-auto max-w-md space-y-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your onchain accounts
        </h4>
        {!!items && items.length === 0 ? (
          <div className="text-primary-900/40">No accounts found.</div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id}>
                <div className="flex flex-row items-start space-x-2">
                  <div>
                    <IconWallet sizeClassName="h-6 w-6" />
                  </div>
                  <div className="w-full">
                    <div className="font-normal">{item.name}</div>
                  </div>
                </div>
                <div className="w-full overflow-hidden font-mono text-sm font-light">
                  <span className="line-clamp-1 truncate">{item.address}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AccountsList;
