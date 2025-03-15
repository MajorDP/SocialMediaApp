import { useContext, useState } from "react";
import Error from "../components/Error";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";
import usePosts from "../hooks/usePosts";
import { AuthContext } from "../context/UserContext";
import {
  Smile,
  Frown,
  Brain,
  Trophy,
  Coffee,
  Heart,
  Sparkles,
  Compass,
  Clock,
} from "lucide-react";

const moods = [
  {
    icon: Smile,
    label: "Happy",
    color: "bg-gradient-to-br from-yellow-400 to-orange-500 text-black",
    glow: "#F59E0B",
  },
  {
    icon: Frown,
    label: "Sad",
    color: "bg-gradient-to-br from-blue-400 to-blue-600 text-black",
    glow: "#3B82F6",
  },
  {
    icon: Brain,
    label: "Stressed",
    color: "bg-gradient-to-br from-red-400 to-red-600 text-black",
    glow: "#EF4444",
  },
  {
    icon: Trophy,
    label: "Motivated",
    color: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-black",
    glow: "#10B981",
  },
  {
    icon: Coffee,
    label: "Relaxed",
    color: "bg-gradient-to-br from-purple-400 to-purple-600 text-black",
    glow: "#8B5CF6",
  },
  {
    icon: Heart,
    label: "Anxious",
    color: "bg-gradient-to-br from-pink-400 to-pink-600 text-black",
    glow: "#EC4899",
  },
];

//TODO: Get random users with matching mood
function Explore() {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("Explore");
  //@ts-expect-error page wont load if no user
  const { posts, error, isLoading, setPosts } = usePosts("explore", user?.id);
  return (
    <div className="p-6 space-y-6">
      {isLoading && (
        <div className="h-screen w-full flex items-center">
          <Spinner />
        </div>
      )}
      {error && <Error error={error} />}

      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-cyan-200">
          How are you feeling today?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`${mood.color} p-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 shadow-md cursor-pointer`}
            >
              <mood.icon size={24} />
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-tr-xl rounded-tl-xl">
        <div className="p-6 flex flex-row gap-4">
          <button
            onClick={() => setSelectedTab("Explore")}
            className={`px-4 py-2 rounded-md bg-gradient-to-r hover:from-blue-800 hover:to-fuchsia-800 transition-colors duration-200 ${
              selectedTab === "Explore"
                ? "from-blue-800 to-fuchsia-950 text-cyan-200"
                : "from-gray-400 to-gray-600"
            } cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <Compass size={16} />
              <span>Explore</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab("Mood Matches")}
            className={`px-4 py-2 rounded-md bg-gradient-to-r hover:from-blue-800 hover:to-fuchsia-800 transition-colors duration-200 ${
              selectedTab === "Mood Matches"
                ? "from-blue-800 to-fuchsia-950 text-cyan-200"
                : "from-gray-400 to-gray-600"
            } cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles size={16} />
              <span>Mood Matches</span>
            </div>
          </button>
        </div>
        {selectedTab === "Explore" && !isLoading && posts && (
          <PostsList posts={posts} setPosts={setPosts} />
        )}

        {selectedTab === "Mood Matches" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {[1, 2, 3, 4, 5, 6].map((match) => (
              <div
                key={match}
                className="bg-gradient-to-br from-[#032f5a] via-blue-950 to-fuchsia-950 p-4 rounded-lg shadow-lg  hover:border-indigo-500 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      match % 2 === 0
                        ? "1494790108377-be9c29b29330"
                        : "1500648767791-00dcc994a43e"
                    }?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                    alt="Profile"
                    className="h-12 w-12 rounded-full ring-2 ring-emerald-500"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-100">
                      {match % 2 === 0 ? "Emma Wilson" : "James Brown"}
                    </h3>
                    <span className="text-sm text-emerald-400">
                      Feeling{" "}
                      {match % 3 === 0
                        ? "Motivated"
                        : match % 2 === 0
                        ? "Happy"
                        : "Relaxed"}
                    </span>
                  </div>
                  <div className="flex items-center text-purple-400">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">Start Chat</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">
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
  );
}

export default Explore;
