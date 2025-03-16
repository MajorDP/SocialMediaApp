import { useState } from "react";
import CredentialsForm from "../components/CredentialsForm";
import ProfilePreview from "../components/ProfilePreview";
import FriendListLarge from "../components/FriendList";

const Account = () => {
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <div className="w-full flex flex-row items-center justify-center min-h-screen">
      <div className="border border-blue-900 flex flex-col w-full md:max-w-[80%] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 sm:p-5 rounded-2xl shadow-lg">
        <div className="flex flex-row items-center justify-center gap-5 mt-2 sm:mt-0">
          <h2
            className={`${
              selectedPage === 0 ? "text-cyan-200" : "text-gray-500"
            } text-sm lg:text-xl mb-4 text-center cursor-pointer`}
            onClick={() => setSelectedPage(0)}
          >
            Profile Preview
          </h2>
          <h2
            className={`${
              selectedPage === 1 ? "text-cyan-200" : "text-gray-500"
            } text-sm lg:text-xl mb-4 text-center cursor-pointer`}
            onClick={() => setSelectedPage(1)}
          >
            Friends
          </h2>
          <h2
            className={`${
              selectedPage === 2 ? "text-cyan-200" : "text-gray-500"
            } text-sm lg:text-xl mb-4 text-center cursor-pointer`}
            onClick={() => setSelectedPage(2)}
          >
            Settings
          </h2>
        </div>
        {selectedPage === 0 && <ProfilePreview />}
        {selectedPage === 1 && <FriendListLarge />}
        {selectedPage === 2 && <CredentialsForm />}
      </div>
    </div>
  );
};

export default Account;
