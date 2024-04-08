import { FC } from "react";
import AuthDropdown from "./AuthDropdown";
import { ThemeToggle } from "./ThemeToggle";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between space-x-2 p-4">
      <h1 className="text-lg">{process.env.NEXT_PUBLIC_APP_NAME!}</h1>
      <div className="flex items-center space-x-4">
        <div>
          <AuthDropdown />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
