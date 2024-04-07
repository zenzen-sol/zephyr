"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
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
        "mx-auto max-w-md py-24",
        !isLoaded && "pointer-events-none opacity-30",
      )}
    >
      <h1>Accounts</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <Link href={`/accounts/${item.id}`}>{item.name}</Link>
            </div>
            <div>{item.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsList;
