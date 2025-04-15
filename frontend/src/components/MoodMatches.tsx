//@ts-nocheck
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import ChatContainer from "./ChatContainer";
import { useTranslation } from "react-i18next";
import { handleCreateTempChat } from "../services/chat-services";
import { getUsersByMood } from "../services/users-services";
import Error from "./Error";

//TODO: FIX TYPESCRIPT ERRORS
function MoodMatches({ user }) {
  const { t } = useTranslation();
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getMatches() {
      const { success, users } = await getUsersByMood(
        user.mood.currentMoods[0],
        user.id
      );

      if (!success) {
        setError("Could not get matching users.");
        return;
      }
      setMatchingUsers(users);
    }
    getMatches();
  }, [user]);

  const handleSelectUser = async (
    selectedUserId: string,
    selectedUserUsername: string
  ) => {
    const { success } = await handleCreateTempChat(user.id, selectedUserId);

    if (success) {
      setSelectedUser({ id: selectedUserId, username: selectedUserUsername });
    }
  };
  return (
    <>
      {selectedUser && (
        <ChatContainer
          currentUserId={user.id}
          selectedFriend={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {error && <Error error={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-3 sm:p-4">
        {matchingUsers.map((match) => (
          <div
            key={match.id}
            className="bg-slate-700 p-3 sm:p-4 rounded-lg shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between space-x-1 md:space-x-3">
              <div className="flex flex-rowg space-x-2">
                <img
                  src={match.img}
                  alt="Profile"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-violet-700 shadow-md shadow-violet-700/50"
                />
                <div className="flex flex-col">
                  <h3 className="font-medium text-slate-50 text-sm sm:text-base">
                    {match.username}
                  </h3>
                  <span className="text-xs sm:text-sm text-slate-50/90">
                    Feeling {match.mood.currentMoods[0]}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center text-slate-50">
                <Clock size={14} className="mr-1 hidden md:block" />
                <span
                  className="text-xs sm:text-sm cursor-pointer flex flex-row"
                  onClick={() => handleSelectUser(match.id, match.username)}
                >
                  {t("Explore.chat")}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-100/90">
              {match.mood.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default MoodMatches;
