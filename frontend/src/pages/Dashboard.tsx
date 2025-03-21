import { Compass, Sparkles } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import usePosts from "../hooks/usePosts";
import PostsList from "../components/PostsList";
import MoodSelector from "../components/MoodSelector";

export default function NewDashboard() {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const { posts, error, isLoading, setPosts } = usePosts(
    "dashboard",
    //@ts-expect-error page wont load if no user
    user?.id
  );

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
    <div className="space-y-6 sm:p-6">
      <MoodSelector />

      <div className="space-y-4">
        {posts && (
          <div className="bg-gray-800 rounded-tr-xl rounded-tl-xl shadow-md ">
            {/* Tabs */}
            <div className="p-6 flex flex-wrap justify-center sm:justify-start md:items-baseline md:flex-row gap-4">
              <button
                onClick={() => setSelectedTab("Dashboard")}
                className={`px-4 py-2 rounded-md transition-colors duration-200 w-36 md:w-auto hover:bg-violet-600 hover:text-white text-slate-900 font-medium ${
                  selectedTab === "Dashboard"
                    ? "bg-violet-700 text-white"
                    : "bg-[#c1d1ff]"
                } cursor-pointer`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Compass size={16} />
                  <span>Dashboard</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab("Memories")}
                className={`px-4 py-2 rounded-md transition-colors duration-200 hover:bg-violet-600 w-36 md:w-auto hover:text-white text-slate-900 font-medium ${
                  selectedTab === "Memories"
                    ? "bg-violet-700 text-white"
                    : "bg-[#c1d1ff]"
                } cursor-pointer`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles size={16} />
                  <span>Memories</span>
                </div>
              </button>
            </div>

            {/* Content */}
            {selectedTab === "Dashboard" &&
              (user?.mood.currentMoods[0] ? (
                <PostsList posts={posts} setPosts={setPosts} />
              ) : (
                <p className="text-center p-4 text-slate-900">
                  Select your mood to customize your feed.
                </p>
              ))}
            {selectedTab === "Memories" && (
              <p className="text-center p-4 text-white">COMING SOON</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
