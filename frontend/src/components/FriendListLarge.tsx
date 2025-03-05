import { useContext, useState } from "react";
import ChatContainer from "./ChatContainer";
import { AuthContext } from "../context/UserContext";
import Spinner from "./Spinner";
import Error from "./Error";
import useFriends from "../hooks/useFriends";
import AddFriendForm from "./AddFriendForm";

function FriendListLarge() {
  const { user } = useContext(AuthContext);
  //@ts-expect-error page wont load if no user
  const { friends, error, isLoading, setFriends } = useFriends(user?.id);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    username: string;
  } | null>(null);

  const handleFriendRequest = async (type: string, friendId: string) => {
    console.log(type, friendId);
    setFriends({
      friends: [],
      requests: [],
    });
  };

  const handleRemoveFriend = async (friendId: string) => {
    console.log(friendId);
    //TODO: Remove friend functionality
  };

  return (
    <>
      {selectedFriend && (
        <ChatContainer
          currentUserId={user?.id as string}
          selectedFriend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}

      <div className="w-full max-w-[90%] mx-auto h-screen bg-gradient-to-b from-gray-900 to-blue-950 rounded-xl mt-2 p-5 shadow-md">
        <AddFriendForm id={user?.id as string} />

        <div className="my-6">
          {friends.requests.length > 0 && (
            <>
              <h2 className="text-center font-semilight text-lg">
                Friend Requests
              </h2>
              <ul className="mt-4">
                {friends.requests.map((req) => (
                  <li
                    className="flex flex-row items-center justify-between p-3 mb-3 bg-gray-800 rounded-lg"
                    key={req.id}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={req.img}
                        className="w-12 h-12 rounded-full"
                        alt={req.username}
                      />
                      <p className="truncate text-md">{req.username}</p>
                    </div>
                    <div className="flex flex-row gap-3">
                      <button
                        className="text-green-700 bg-green-300 text-sm px-3 py-1 rounded-full hover:bg-green-400 transition"
                        onClick={() => handleFriendRequest("accept", req.id)}
                      >
                        ✔
                      </button>
                      <button
                        className="text-red-700 bg-red-300 text-sm px-3 py-1 rounded-full hover:bg-red-400 transition"
                        onClick={() => handleFriendRequest("reject", req.id)}
                      >
                        ✖
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <h2 className="text-center font-semilight text-lg">Your Friends</h2>

        {error && <Error error={error} />}

        {isLoading ? (
          <Spinner />
        ) : friends && friends.friends.length > 0 ? (
          <ul className="mt-4 flex flex-row flex-wrap gap-2 justify-center">
            {friends.friends.map((friend) => (
              <li
                className="w-full lg:w-[40%] flex flex-row items-center justify-between p-2 bg-gray-800 rounded-lg"
                key={friend.id}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend.img}
                    className="w-8 h-8 sm:w-14 sm:h-14 rounded-full"
                    alt={friend.username}
                  />
                  <div className="flex flex-col">
                    <p className="truncate text-xs font-semibold">
                      {friend.username}
                    </p>
                    <p className="text-xs text-gray-400">status later</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    className="text-[12px] border px-2 py-1 rounded-xl border-blue-900 bg-gray-700 hover:bg-gray-800 transition cursor-pointer"
                    onClick={() =>
                      setSelectedFriend({
                        id: friend.id,
                        username: friend.username,
                      })
                    }
                  >
                    Chat
                  </button>
                  <button
                    className="text-[12px] cursor-pointer border h-6 m-auto px-2 py-1 rounded-xl border-red-900 bg-red-700 hover:bg-red-800 duration-300"
                    onClick={() => handleRemoveFriend(friend.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 py-4 text-md">
            No friends yet, maybe add some?
          </p>
        )}
      </div>
    </>
  );
}

export default FriendListLarge;
