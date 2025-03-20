import { useContext, useState } from "react";
import Error from "../components/Error";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";
import usePosts from "../hooks/usePosts";
import { AuthContext } from "../context/UserContext";
import { Sparkles, Compass, Clock } from "lucide-react";
import ChatContainer from "../components/ChatContainer";
import MoodSelector from "../components/MoodSelector";

//TODO: Get random users with matching mood
function Explore() {
  const { user } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    username: string;
  } | null>(null);

  const [selectedTab, setSelectedTab] = useState("Explore");
  //@ts-expect-error page wont load if no user
  const { posts, error, isLoading, setPosts } = usePosts("explore", user?.id);
  return (
    <>
      {selectedUser && (
        <ChatContainer
          currentUserId={user?.id as string}
          selectedFriend={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <div className="sm:p-6 space-y-6">
        {isLoading && (
          <div className="h-screen w-full flex items-center">
            <Spinner />
          </div>
        )}
        {error && <Error error={error} />}

        <MoodSelector />

        <div className="bg-gray-800 rounded-tr-xl rounded-tl-xl ">
          <div className="p-6 flex flex-row flex-wrap justify-center sm:justify-start md:flex-row gap-4">
            <button
              onClick={() => setSelectedTab("Explore")}
              className={`px-4 py-2 rounded-md hover:bg-violet-600 hover:text-white text-slate-900 transition-colors duration-200 w-36 md:w-auto font-medium ${
                selectedTab === "Explore"
                  ? "bg-violet-700 text-white"
                  : "bg-[#c1d1ff]"
              } cursor-pointer`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Compass size={16} />
                <span>Explore</span>
              </div>
            </button>
            <button
              onClick={() => setSelectedTab("Mood Matches")}
              className={`px-4 py-2 rounded-md hover:bg-violet-600 hover:text-white text-slate-900 transition-colors duration-200 w-36 md:w-auto font-medium ${
                selectedTab === "Mood Matches"
                  ? "bg-violet-700 text-white"
                  : "bg-[#c1d1ff]"
              } cursor-pointer`}
            >
              <div className="flex flex-row items-center justify-center space-x-2">
                <Sparkles size={16} />
                <span className="flex flex-row">
                  <span className="hidden sm:inline">Mood</span>{" "}
                  <span>Matches</span>
                </span>
              </div>
            </button>
          </div>
          {selectedTab === "Explore" && !isLoading && posts && (
            <PostsList posts={posts} setPosts={setPosts} />
          )}

          {selectedTab === "Mood Matches" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-3 sm:p-4">
              {[1, 2, 3, 4, 5, 6].map((match) => (
                <div
                  key={match}
                  className="bg-[#c4d4ff] p-3 sm:p-4 rounded-lg shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between space-x-1 md:space-x-3">
                    <div className="flex flex-rowg space-x-2">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          match % 2 === 0
                            ? "1494790108377-be9c29b29330"
                            : "1500648767791-00dcc994a43e"
                        }?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                        alt="Profile"
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-violet-700 shadow-lg shadow-violet-700/50"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-medium text-slate-900 text-sm sm:text-base">
                          {match % 2 === 0 ? "Emma Wilson" : "James Brown"}
                        </h3>
                        <span className="text-xs sm:text-sm text-slate-900/80">
                          Feeling{" "}
                          {match % 3 === 0
                            ? "Motivated"
                            : match % 2 === 0
                            ? "Happy"
                            : "Relaxed"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-violet-700">
                      <Clock size={14} className="mr-1 hidden md:block" />
                      <span
                        className="text-xs sm:text-sm cursor-pointer flex flex-row"
                        onClick={() =>
                          setSelectedUser({
                            id: "1",
                            username: "user",
                          })
                        }
                      >
                        Chat
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-900">
                    {match % 2 === 0
                      ? "Looking for someone to share positive vibes with!"
                      : "Would love to connect with like-minded people."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Explore;
