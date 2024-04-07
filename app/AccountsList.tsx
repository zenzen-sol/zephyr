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
  return (
    <div>
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
