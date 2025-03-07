import { useContext, useState } from "react";
import ChatContainer from "./ChatContainer";
import { AuthContext } from "../context/UserContext";
import Spinner from "./Spinner";
import Error from "./Error";
import useFriends from "../hooks/useFriends";
import AddFriendForm from "./AddFriendForm";
import { handleFriendRequests } from "../services/users-services";

function FriendList() {
  const { user } = useContext(AuthContext);
  //@ts-expect-error page wont load if no user
  const { friends, error, isLoading, setFriends } = useFriends(user.id);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    username: string;
  } | null>(null);

  const handleFriendRequest = async (type: string, friendId: string) => {
    const { success, data } = await handleFriendRequests(
      type,
      user?.id,
      friendId
    );

    if (!success) {
      return;
    }

    if (type === "accept") {
      setFriends({
        friends: [...friends.friends, data.friends],
        requests: data.requests,
      });
    }

    if (type === "reject") {
      setFriends({
        friends: [...friends.friends],
        requests: data.requests,
      });
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    console.log(friendId);
    //TODO: Remove friend functionality
  };

  return (
    <>
      {selectedFriend && (
        <ChatContainer
          currentUserId={user?.id ? user.id : "user123"}
          selectedFriend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
      <div className="w-[15rem] m-auto h-fit bg-gradient-to-b from-gray-900 to-blue-950 rounded-xl border border-blue-900 mt-2">
        <AddFriendForm id={user?.id as string} />
        <div className="my-4">
          {friends.requests.length > 0 && (
            <>
              <h2 className="text-center font-semilight text-sm">Requests</h2>
              <ul>
                {friends.requests.map((req) => (
                  <li
                    className="flex flex-row justify-around p-2 mb-2 gap-1"
                    key={req.id}
                  >
                    <div className="w-[20%]">
                      <img
                        src={req.img}
                        className="w-full rounded-full"
                        alt={req.username}
                      />
                    </div>
                    <div className="flex justify-around flex-col text-sm w-[40%]">
                      <div className="flex flex-row justify-between">
                        <p className="truncate text-xs">{req.username}</p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between w-16 items-center">
                      <button
                        className="text-green-700 cursor-pointer bg-green-300 text-xs px-2 py-1 h-fit rounded-full"
                        onClick={() => handleFriendRequest("accept", req.id)}
                      >
                        ✔
                      </button>
                      <button
                        className="text-red-700 cursor-pointer bg-red-300 text-xs px-2 py-1 h-fit rounded-full"
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
        <h2 className="text-center font-semilight text-sm">Friends</h2>

        {error && <Error error={error} />}

        {isLoading ? (
          <Spinner />
        ) : friends && friends.friends.length > 0 ? (
          <ul>
            {friends.friends.map((friend) => (
              <li
                className="flex flex-row justify-around p-2 mb-2 gap-1"
                key={friend.id}
              >
                <div className="w-[20%]">
                  <img
                    src={friend.img}
                    className="w-full rounded-full"
                    alt={friend.username}
                  />
                </div>
                <div className="flex justify-around flex-col text-sm w-[40%]">
                  <div className="flex flex-row justify-between">
                    <p className="truncate text-xs">{friend.username}</p>
                  </div>
                  <p className="text-[12px] truncate text-gray-400">
                    {/* {friend.status} */}status later
                  </p>
                </div>
                <button
                  className="w-fit text-[12px] cursor-pointer border h-6 m-auto px-2 py-1 rounded-xl border-blue-900 bg-gray-700 hover:bg-gray-800 duration-300"
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
                  className="w-fit text-[12px] cursor-pointer border h-6 m-auto px-2 py-1 rounded-xl border-red-900 bg-red-700 hover:bg-red-800 duration-300"
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 py-2 text-[14px]">
            No friends yet, maybe add some?
          </p>
        )}
      </div>
    </>
  );
}

export default FriendList;
