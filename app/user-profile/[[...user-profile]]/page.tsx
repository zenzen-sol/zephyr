"use client";

import { IconChevronRight } from "@/components/ui/icons";
import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="mx-auto flex min-h-screen flex-row justify-center bg-gray-700 py-12">
    <UserProfile path="/user-profile" routing="path">
      <UserProfile.Link
        label="Back"
        labelIcon={
          <IconChevronRight
            sizeClassName="h-4 w-4"
            className="rotate-180"
            strokeWidth={3}
          />
        }
        url="/"
      />
    </UserProfile>
  </div>
);

export default UserProfilePage;
