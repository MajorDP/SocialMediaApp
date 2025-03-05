import { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import usePosts from "../hooks/usePosts";
import Error from "./Error";
import Spinner from "./Spinner";
import PostSmall from "./PostSmall";

const ProfilePreview = () => {
  const { user } = useContext(AuthContext);
  //@ts-expect-error page wont load if no user
  const { posts, error, isLoading, setPosts } = usePosts("friends", user.id);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <Error
        error="User could not be found"
        navigate="/"
        navigateMsg="Back to dashboard"
      />
    );

  return (
    <div className="w-full h-screen overflow-y-auto scrollbar-hide pb-20">
      <div className="flex flex-col gap-4 p-5 border-b border-gray-700 items-center justify-center">
        <div className="w-16 sm:w-[5rem]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s"
            alt="userImg"
            className="w-full rounded-full border-2 border-cyan-500 shadow-md shadow-cyan-600/50"
          />
        </div>
        <div className="flex flex-col justify-center sm:justify-around sm:my-auto text-center">
          <p className="truncate text-cyan-400 font-medium text-lg sm:text-2xl">
            Username
          </p>
          <p className="text-xs sm:text-sm truncate text-blue-300">
            Status/Description of user goes here
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <ul className="flex flex-col gap-4 items-center">
          {posts?.map((post) => (
            <PostSmall post={post} setPosts={setPosts} isEditable />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePreview;
