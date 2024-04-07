"use client";

import { Button } from "@/components/ui/button";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FC } from "react";

const AuthButton: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const Clerk = useClerk();

  const openUserProfile = () => {
    router.push("/user-profile");
  };

  if (!isLoaded)
    return (
      <Button disabled={true} aria-disabled={true} className="animate-pulse">
        Loading
      </Button>
    );

  return (
    <>
      {isLoaded && isSignedIn ? (
        <div className="flex flex-row items-center space-x-2 text-sm">
          {!!user?.username && (
            <Button onClick={() => openUserProfile()}>{user?.username}</Button>
          )}
          <Button onClick={() => Clerk.signOut()}>Sign out</Button>
        </div>
      ) : (
        <Button onClick={() => Clerk.openSignIn()}>Sign in</Button>
      )}
    </>
  );
};

export default AuthButton;
