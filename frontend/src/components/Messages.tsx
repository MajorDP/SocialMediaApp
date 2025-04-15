//@ts-nocheck
import { Clock, MessageCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Spinner from "./Spinner";
import useFriends from "../hooks/useFriends";
import ChatContainer from "./ChatContainer";
import Error from "./Error";
import { useTranslation } from "react-i18next";
import { handleGetTempChats } from "../services/chat-services";

//TODO: FIX TYPESCRIPT ERRORS
function ChatNew() {
  const { t } = useTranslation();
  const [height, setHeight] = useState("0px");
  const { user } = useContext(AuthContext);

  const { friends, error, isLoading } = useFriends(user?.id);
  const [tempChats, setTempChats] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [tempChatError, setTempChatError] = useState<string | null>(null);

  useEffect(() => {
    async function getTempChats() {
      const { success, chats } = await handleGetTempChats(user?.id);

      if (!success) {
        setTempChatError("Could not get temporary chats.");
        return;
      }

      setTempChats(chats);
    }

    getTempChats();
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {selectedFriend && (
        <ChatContainer
          currentUserId={user?.id as string}
          selectedFriend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
      <div
        className={`z-50 p-1 bg-[#dbe4ff] border border-slate-700 absolute right-0 sm:right-5 bottom-15 sm:bottom-0  ${
          height === "0px" ? "w-10" : "w-full"
        } sm:w-[20rem] rounded-xl overflow-hidden transition-all sm:duration-500`}
      >
        <h2
          onClick={() => setHeight(height === "0px" ? "30rem" : "0px")}
          className="text-slate-700 flex justify-center items-center gap-1 m-2 cursor-pointer"
        >
          <MessageCircle />
          <span className="hidden sm:block"> {t("Chat.message")}</span>
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div
            style={{
              height: height,
            }}
            className="transition-all sm:duration-500 flex flex-col overflow-x-hidden overflow-y-scroll scrollbar-hide"
          >
            {friends &&
              friends.friends.map((friend) => (
                <div
                  onClick={() =>
                    setSelectedFriend({
                      id: friend.id,
                      username: friend.username,
                    })
                  }
                  key={friend.id}
                  className="p-3 rounded-lg bg-slate-700 shadow-lg max-w-fit duration-200 cursor-pointer transform hover:scale-[1.01] flex flex-row justify-between min-w-full"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={friend.img}
                      alt="Profile"
                      className="h-10 w-10 rounded-full ring-2 shadow-lg shadow-violet-700"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-50">
                        {friend.username}
                      </h3>
                      <span className="text-sm text-slate-100">
                        {friend.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-violet-600">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{t("Chat.openChat")}</span>
                  </div>
                </div>
              ))}
            {tempChats.length > 0 &&
              tempChats.map((chat) => {
                const otherUser = chat.participants.find(
                  (u) => u.id !== user.id
                );
                return (
                  <div
                    key={otherUser.id}
                    onClick={() =>
                      setSelectedFriend({
                        id: otherUser.id,
                        username: otherUser.username,
                      })
                    }
                    className="p-3 rounded-lg bg-slate-700 shadow-lg max-w-fit duration-200 cursor-pointer transform hover:scale-[1.01] flex flex-row justify-between min-w-full"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={otherUser.img}
                        alt="Profile"
                        className="h-10 w-10 rounded-full ring-2 shadow-lg shadow-violet-700"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-50">
                          {otherUser.username}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-50">
                      <Clock size={16} className="mr-1" />
                      <span className="text-sm">{t("Chat.openChat")}</span>
                    </div>
                  </div>
                );
              })}

            {error ||
              (tempChatError && (
                <div className="flex">
                  <Error error={error || tempChatError} />
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ChatNew;
