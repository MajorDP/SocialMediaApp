import { useState } from "react";
import Settings from "../components/Settings";
import ProfilePreview from "../components/ProfilePreview";
import FriendListLarge from "../components/FriendList";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <div className="w-full flex flex-row items-center justify-center min-h-screen">
      <div className="flex flex-col w-full md:max-w-[80%] bg-gray-800 sm:p-5 rounded-2xl shadow-lg">
        <div className="flex flex-row items-center justify-center gap-5 mt-2 sm:mt-0">
          <h2
            className={`${
              selectedPage === 0 ? "text-white" : "text-gray-500"
            } text-sm lg:text-xl mb-4 text-center cursor-pointer`}
            onClick={() => setSelectedPage(0)}
          >
            {t("Account.pages.profile")}
          </h2>
          <h2
            className={`${
              selectedPage === 1 ? "text-white" : "text-gray-500"
            } text-sm lg:text-xl mb-4 text-center cursor-pointer`}
            onClick={() => setSelectedPage(1)}
          >
            {t("Account.pages.friends")}
          </h2>
          <h2
            className={`${
              selectedPage === 2 ? "text-white" : "text-gray-500"
            } text-sm lg:text-xl mb-4 text-center cursor-pointer`}
            onClick={() => setSelectedPage(2)}
          >
            {t("Account.pages.settings")}
          </h2>
        </div>
        {selectedPage === 0 && <ProfilePreview />}
        {selectedPage === 1 && <FriendListLarge />}
        {selectedPage === 2 && <Settings />}
      </div>
    </div>
  );
};

export default Account;
