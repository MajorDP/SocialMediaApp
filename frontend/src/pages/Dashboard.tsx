import {
  Smile,
  Frown,
  Brain,
  Trophy,
  Coffee,
  Heart,
  Compass,
  Sparkles,
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import usePosts from "../hooks/usePosts";
import PostsList from "../components/PostsList";
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

export default function NewDashboard() {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("Explore");

  //@ts-expect-error page wont load if no user
  const { posts, error, isLoading, setPosts } = usePosts("dashboard", user?.id);
  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Error error={error} navigate="/" navigateMsg="Refresh page" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1 sm:p-6">
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

      <div className="space-y-4">
        {posts && (
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-tr-xl rounded-tl-xl">
            <div className="p-6 flex flex-row gap-4">
              <button
                onClick={() => setSelectedTab("Dashboard")}
                className={`px-4 py-2 rounded-md bg-gradient-to-r hover:from-blue-800 hover:to-fuchsia-800 transition-colors duration-200 ${
                  selectedTab === "Dashboard"
                    ? "from-blue-800 to-fuchsia-950 text-cyan-200"
                    : "from-gray-400 to-gray-600"
                } cursor-pointer`}
              >
                <div className="flex items-center space-x-2">
                  <Compass size={16} />
                  <span>Dashboard</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab("Memories")}
                className={`px-4 py-2 rounded-md bg-gradient-to-r hover:from-blue-800 hover:to-fuchsia-800 transition-colors duration-200 ${
                  selectedTab === "Memories"
                    ? "from-blue-800 to-fuchsia-950 text-cyan-200"
                    : "from-gray-400 to-gray-600"
                } cursor-pointer`}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles size={16} />
                  <span>Memories</span>
                </div>
              </button>
            </div>
            {selectedTab === "Dashboard" && (
              <PostsList posts={posts} setPosts={setPosts} />
            )}
            {selectedTab === "Memories" && <p>COMING SOON</p>}
          </div>
        )}
      </div>
    </div>
  );
}
