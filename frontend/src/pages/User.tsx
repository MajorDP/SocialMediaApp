import PostsList from "../components/PostsList";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { getPostsByUser } from "../services/posts-services";
import { useContext, useEffect, useState } from "react";
import { IPosts } from "../interfaces/posts";
import { getUser } from "../services/users-services";
import { AuthContext } from "../context/UserContext";
import useFriends from "../hooks/useFriends";

function User() {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const { friends } = useFriends(currentUser?.id as string);

  const [posts, setPosts] = useState<IPosts[] | null>(null);
  const [user, setUser] = useState<{
    username: string;
    id: string;
    status: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      const { success, user } = await getUser(id);
      const { success: success1, posts } = await getPostsByUser(id);

      if (!success || !success1) {
        setError("Could not get posts by that user.");
        return;
      }

      setPosts(posts);
      setUser(user);
      setisLoading(false);
    }
    getPosts();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Error
        error={"User could not be found"}
        navigate="/"
        navigateMsg="Back to dashboard"
      />
    );
  }

  return (
    <div className="w-full md:w-[80%] m-auto overflow-y-auto scrollbar-hide pb-20 h-screen">
      <div className="flex flex-col rounded-xl">
        <div className="flex flex-col items-center gap-4 p-5">
          <div className="w-16 sm:w-[8rem]">
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s"
              }
              alt="userImg"
              className="w-full rounded-full border-2 shadow-md shadow-violet-700/50"
            />
          </div>
          <div className="flex flex-col justify-center sm:justify-around sm:my-auto text-center">
            <p className="truncate text-slate-700 font-medium text-lg sm:text-2xl">
              {user?.username}
            </p>
            <p className="text-xs sm:text-sm truncate text-slate-300">
              {user?.status}
            </p>
          </div>
        </div>
        {user?.id !== currentUser?.id && (
          <div className="m-auto flex flex-col sm:flex-row items-center gap-2 justify-between mb-2 sm:mb-8 text-xs sm:text-sm">
            {
              //@ts-expect-error id is always there
              !friends.friends.includes(user?.id) ? (
                <button className=" px-2 py-1 bg-green-600 hover:bg-green-500 hover:scale-105 duration-300 cursor-pointer rounded-xl shadow-lg">
                  Add as friend
                </button>
              ) : (
                <button className=" px-2 py-1 bg-red-600 hover:bg-red-500 hover:scale-105 duration-300 cursor-pointer rounded-xl shadow-lg">
                  Remove friend
                </button>
              )
            }

            <button className=" px-2 py-1 bg-blue-600 hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer rounded-xl shadow-lg">
              Follow
            </button>
            <button className=" px-2 py-1 bg-blue-600 hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer rounded-xl shadow-lg">
              Unfollow
            </button>
          </div>
        )}
        <div className=" border-b border-gray-700 w-[90%] m-auto "></div>
        <div className="flex flex-col gap-4 h-fit">
          <PostsList posts={posts} setPosts={setPosts} />
        </div>
      </div>
    </div>
  );
}

export default User;
