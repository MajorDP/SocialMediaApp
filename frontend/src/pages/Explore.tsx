import { useContext, useState } from "react";
import Error from "../components/Error";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";
import usePosts from "../hooks/usePosts";
import { AuthContext } from "../context/UserContext";
import { Sparkles, Compass } from "lucide-react";
import MoodSelector from "../components/MoodSelector";
import { useTranslation } from "react-i18next";
import MoodMatches from "../components/MoodMatches";

//TODO: Get random users with matching mood
function Explore() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState("Explore");
  //@ts-expect-error page wont load if no user
  const { posts, error, isLoading, setPosts } = usePosts("explore", user?.id);
  return (
    <>
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
                <span>{t("Explore.options.explore")}</span>
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
                  {t("Explore.options.moodMatches")}
                </span>
              </div>
            </button>
          </div>
          {selectedTab === "Explore" && !isLoading && posts && (
            <PostsList posts={posts} setPosts={setPosts} />
          )}

          {selectedTab === "Mood Matches" && <MoodMatches user={user} />}
        </div>
      </div>
    </>
  );
}

export default Explore;
