"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

const UserMenu: FC = () => {
  const imageUrl = undefined;
  const isLoaded = true;
  const [initials, setInitials] = useState("");

  const handleSignOut = async () => {
    try {
      /* signOut(); */
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const handleManageProfile = () => {
    /* openUserProfile(); */
  };

  useEffect(() => {
    const _initials = getInitials(`User Name`);
    setInitials(_initials);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={!isLoaded}
          aria-disabled={!isLoaded}
        >
          <span className="flex flex-row items-center space-x-2">
            Username
            {!!imageUrl && (
              <Avatar className="bg-primary-900/10 h-7 w-7 dark:bg-white/10">
                <AvatarImage src={imageUrl} />
                <AvatarFallback delayMs={1000}>{initials}</AvatarFallback>
              </Avatar>
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" loop>
        <DropdownMenuItem onClick={handleManageProfile}>
          Manage Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
