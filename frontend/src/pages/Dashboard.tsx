import FriendList from "../components/FriendList";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";
import usePosts from "../hooks/usePosts";
import Error from "../components/Error";
import { useContext } from "react";
import { AuthContext } from "../context/UserContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  //@ts-expect-error page wont load if no user
  const { posts, error, isLoading, setPosts } = usePosts("friends", user?.id);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 rounded-xl bg-gray-900 shadow-lg shadow-cyan-500 justify-around">
      <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="h-[50vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="h-[50vh] flex items-center justify-center">
            <Error error={error} navigate="/" navigateMsg="Refresh page" />
          </div>
        ) : posts ? (
          <div className="h-screen overflow-y-auto scrollbar-hide pb-20 sm:pb-0">
            <PostsList posts={posts} setPosts={setPosts} />
          </div>
        ) : null}
      </div>
      <div className="hidden md:block w-1/3 rounded-lg min-h-[60vh]  overflow-hidden">
        <div className="w-full h-full overflow-y-auto scrollbar-hide">
          <FriendList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
