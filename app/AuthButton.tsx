"use client";

import { Button } from "@/components/ui/button";
import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const { refresh } = useRouter();
  const { ready, authenticated, user } = usePrivy();

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated);
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  const { logout } = useLogout({
    onSuccess: () => {
      refresh();
      console.log("User logged out");
      // Any logic you'd like to execute after a user successfully logs out
    },
  });

  const handleLogin = () => {
    try {
      login();
    } catch (error: unknown) {
      console.error("Failed to log in", error);
    }
  };

  const handleLogout = () => {
    try {
      logout();
    } catch (error: unknown) {
      console.error("Failed to log out", error);
    }
  };

  if (!ready)
    return (
      <Button disabled={true} aria-disabled={true} className="animate-pulse">
        Loading
      </Button>
    );

  return (
    <>
      {ready && authenticated ? (
        <div className="flex flex-row items-center space-x-2 text-sm">
          {!!user && <div>User {user?.id} is logged in.</div>}
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      ) : (
        <Button onClick={handleLogin}>Log in</Button>
      )}
    </>
  );
};

export default AuthButton;
