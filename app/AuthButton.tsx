"use client";

import { Button } from "@/components/ui/button";
import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";

const AuthButton = () => {
  const { ready, authenticated, user } = usePrivy();

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      console.debug(user, isNewUser, wasAlreadyAuthenticated);
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
    },
    onError: (error) => {
      console.error(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  const { logout } = useLogout({
    onSuccess: () => {
      console.debug("User logged out");
      // Any logic you'd like to execute after a user successfully logs out
    },
  });

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
          <Button onClick={logout}>Log out</Button>
        </div>
      ) : (
        <Button onClick={login}>Log in</Button>
      )}
    </>
  );
};

export default AuthButton;
