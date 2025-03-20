import { Clock, MessageCircle } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Spinner from "./Spinner";
import useFriends from "../hooks/useFriends";
import ChatContainer from "./ChatContainer";
import Error from "./Error";

function ChatNew() {
  const [height, setHeight] = useState("0px");
  const { user } = useContext(AuthContext);

  //@ts-expect-error user is of correct type
  const { friends, error, isLoading } = useFriends(user?.id);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    username: string;
  } | null>(null);

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
        className={`z-50 border border-slate-600 absolute right-0 sm:right-5 bottom-15 sm:bottom-0 bg-gray-800 ${
          height === "0px" ? "w-10" : "w-full"
        } sm:w-[20rem] rounded-xl overflow-hidden transition-all sm:duration-500`}
      >
        <h2
          onClick={() => setHeight(height === "0px" ? "30rem" : "0px")}
          className="text-white flex justify-center items-center gap-1 m-2 cursor-pointer"
        >
          <MessageCircle />
          <span className="hidden sm:block"> Chat</span>
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
                  className="p-3 rounded-lg bg-[#c1d1ff] shadow-lg max-w-fit duration-200 cursor-pointer transform hover:scale-[1.02] flex flex-row justify-between min-w-full"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={friend.img}
                      alt="Profile"
                      className="h-10 w-10 rounded-full ring-2 shadow-lg shadow-violet-700/50"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        {friend.username}
                      </h3>
                      <span className="text-sm text-slate-900">
                        {friend.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-violet-600">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">Open Chat</span>
                  </div>
                </div>
              ))}
            {error && (
              <div className="flex">
                <Error error={error} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ChatNew;
