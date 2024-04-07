import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="mx-auto flex flex-row justify-center bg-gray-700 py-12">
    <UserProfile path="/user-profile" routing="path" />
  </div>
);

export default UserProfilePage;
