import { FC } from "react";
import AuthButton from "./AuthButton";
import { ThemeToggle } from "./ThemeToggle";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between space-x-2 p-4">
      <h1 className="text-lg">Zenzen Web3 Starter</h1>
      <div className="flex items-center space-x-4">
        <div>
          <AuthButton />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
