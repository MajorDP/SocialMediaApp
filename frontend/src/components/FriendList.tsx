import { useContext, useState } from "react";
import ChatContainer from "./ChatContainer";
import { AuthContext } from "../context/UserContext";
import Spinner from "./Spinner";
import Error from "./Error";
import useFriends from "../hooks/useFriends";
import AddFriendForm from "./AddFriendForm";
import { Clock, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { handleFriendRequests, removeFriend } from "../services/users-services";

function FriendListLarge() {
  const { user, updateUser } = useContext(AuthContext);

  const { friends, error, isLoading, setFriends } =
    //@ts-expect-error page wont load if no user
    useFriends(user?.id);
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
      //@ts-expect-error aaa
      updateUser({
        ...user,
        friends: [...friends.friends, data.friends],
        requests: data.requests,
      });
    }

    if (type === "reject") {
      setFriends({
        friends: [...friends.friends],
        requests: data.requests,
      });

      //@ts-expect-error aaa
      updateUser({
        ...user,
        friends: [...friends.friends],
        requests: data.requests,
      });
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    const { success, data } = await removeFriend(user?.id, friendId);

    if (success) {
      setFriends({
        requests: [...friends.requests],
        friends: data.currentUser.friends,
      });
      //@ts-expect-error aaa
      updateUser({
        ...user,
        friends: data.currentUser.friends,
        requests: [...friends.requests],
      });
    }
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

      <div className="w-full max-w-[90%] mx-auto h-screen rounded-xl mt-2 sm:p-5 shadow-md">
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
                    className="flex flex-row items-center justify-between p-3 mb-3 bg-gradient-to-b from-[#032f5a] via-blue-950 to-violet-950 rounded-lg"
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
                        className="text-green-700 bg-green-300 text-sm px-3 py-1 rounded-full hover:bg-green-400 transition cursor-pointer"
                        onClick={() => handleFriendRequest("accept", req.id)}
                      >
                        ✔
                      </button>
                      <button
                        className="text-red-700 bg-red-300 text-sm px-3 py-1 rounded-full hover:bg-red-400 transition cursor-pointer"
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
              <div
                key={friend.id}
                className="w-full sm:w-auto bg-gradient-to-br from-[#032f5a] via-blue-950 to-fuchsia-950 p-2 sm:p-4 rounded-lg shadow-lg  hover:border-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-3">
                  <img
                    src={friend.img}
                    alt="Profile"
                    className="h-12 w-12 rounded-full ring-2 ring-emerald-500"
                  />
                  <div className="flex flex-col flex-1">
                    <Link
                      to={`/user/${friend.id}`}
                      className="font-medium text-center sm:text-start text-gray-100"
                    >
                      {friend.username}
                    </Link>
                    <span className="text-sm text-center sm:text-start text-emerald-400">
                      Feeling {friend.status}
                    </span>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center text-white justify-between gap-2">
                    <div className="w-fit flex flex-row items-center hover:scale-105 duration-200 bg-purple-900 rounded-xl px-2 py-1 text-[14px]">
                      <Clock size={14} className="mr-1" />
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedFriend({
                            id: friend.id,
                            username: friend.username,
                          })
                        }
                      >
                        Chat
                      </button>
                    </div>
                    <button
                      className="flex flex-row items-center hover:scale-105 text-[14px] cursor-pointer h-6 m-auto px-2 py-1 rounded-xl bg-red-700 hover:bg-red-800 duration-200 text-white"
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      <Trash size={14} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400 text-center sm:text-start">
                  {Math.random() % 2 === 0
                    ? "Looking for someone to share positive vibes with!"
                    : "Would love to connect with like-minded people."}
                </p>
              </div>
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
