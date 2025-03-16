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
    <div className="space-y-6 sm:p-6">
      <MoodSelector />

      <div className="space-y-4">
        {posts && (
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-tr-xl rounded-tl-xl">
            <div className="p-6 flex flex-row flex-wrap justify-center sm:justify-start md:items-baseline md:flex-row gap-4">
              <button
                onClick={() => setSelectedTab("Dashboard")}
                className={`px-4 py-2 rounded-md bg-gradient-to-r hover:from-blue-800 hover:to-fuchsia-800 transition-colors duration-200 w-36 md:w-auto ${
                  selectedTab === "Dashboard"
                    ? "from-blue-800 to-fuchsia-950 text-cyan-200"
                    : "from-gray-400 to-gray-600"
                } cursor-pointer`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Compass size={16} />
                  <span>Dashboard</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab("Memories")}
                className={`px-4 py-2 rounded-md bg-gradient-to-r hover:from-blue-800 hover:to-fuchsia-800 transition-colors duration-200 w-36 md:w-auto ${
                  selectedTab === "Memories"
                    ? "from-blue-800 to-fuchsia-950 text-cyan-200"
                    : "from-gray-400 to-gray-600"
                } cursor-pointer`}
              >
                <div className="flex items-center justify-center space-x-2">
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
