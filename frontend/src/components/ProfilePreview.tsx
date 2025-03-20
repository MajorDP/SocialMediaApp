import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Error from "./Error";
import Spinner from "./Spinner";
import PostSmall from "./PostSmall";
import { Link } from "react-router-dom";
import { IPosts } from "../interfaces/posts";
import { getPostsByUser } from "../services/posts-services";

const ProfilePreview = () => {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState<IPosts[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      const { success, posts } = await getPostsByUser(user?.id);

      if (!success) {
        setError("Could not get posts by that user.");
        setisLoading(false);
        return;
      }
      setPosts(posts);
      setisLoading(false);
    }
    getPosts();
  }, [user?.id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Error
        error="User could not be found"
        navigate="/"
        navigateMsg="Back to dashboard"
      />
    );
  }

  return (
    <div className="w-full h-screen overflow-y-auto scrollbar-hide pb-20">
      <div className="flex flex-col gap-4 p-5 items-center justify-center">
        <div className="w-16 sm:w-[5rem]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s"
            alt="userImg"
            className="w-full rounded-full shadow-md shadow-cyan-600/50"
          />
        </div>
        <div className="flex flex-col justify-center sm:justify-around sm:my-auto text-center">
          <p className="truncate text-white text-lg sm:text-2xl">
            {user?.username}
          </p>
          <p className="text-xs sm:text-sm truncate text-slate-300">
            {user?.status}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <ul className="flex flex-col gap-4 items-center">
          {posts?.map((post, index) => (
            <PostSmall post={post} setPosts={setPosts} isEditable key={index} />
          ))}
          {posts?.length === 0 && (
            <p>
              No posts yet,{" "}
              <Link to="/create" className="underline">
                Maybe make one?
              </Link>
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePreview;
