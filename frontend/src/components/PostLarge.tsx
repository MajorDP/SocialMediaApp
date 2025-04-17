import { useContext, useState } from "react";
import { IPosts } from "../interfaces/posts";
import { AuthContext } from "../context/UserContext";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { updateVote } from "../services/posts-services";
import { Heart, ThumbsDown } from "lucide-react";

interface IPostItem {
  post: IPosts;
  setPost: React.Dispatch<React.SetStateAction<IPosts | null>>;
}

function PostLarge({ post, setPost }: IPostItem) {
  const { user, updateUser } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (voteType: string) => {
    const { data, error } = await updateVote(user?.id, post.id, voteType);
    if (error) {
      setError(error.message);
    } else {
      setPost(data.post);
      updateUser(data.user);
    }
  };

  const handleSetPosts = (data: IPosts) => {
    setPost(data);
  };

  const isVoted = user?.votes.liked.includes(post?.id || "")
    ? "liked"
    : user?.votes.disliked.includes(post?.id || "")
    ? "disliked"
    : null;

  return (
    <div className="flex flex-col lg:flex-row w-full md:max-w-[80%] bg-slate-700 shadow-inner p-2 sm:p-3 rounded-2xl ">
      <div className="w-full">
        <div className="flex flex-row w-full p-3">
          <Link
            to={`/user/${post.user.id}`}
            className="w-[20%] sm:max-w-[10%] md:max-w-[12%] xl:max-w-[15%]"
          >
            <img
              src={post?.user.img}
              className="rounded-full w-fit shadow-lg shadow-violet-700/50 cursor-pointer"
            />
          </Link>
          <div className="flex flex-col justify-start ml-2 w-[80%] xl:max-w-[85%]">
            <Link
              to={`/user/${post.user.id}`}
              className="text-lg font-semibold text-white cursor-pointer"
            >
              {post?.user.username}
            </Link>
            <p className="text-xs text-slate-300 font-semibold">
              {post?.datePosted.split("T")[0]}
              <span> {post.isEdited && "(Edited)"}</span>
            </p>
            <div className="hidden sm:flex flex-col w-full">
              <p className="break-words w-full my-2 text-white text-sm lg:text-lg">
                {post?.message}
              </p>
              <div className="max-w-[20rem] lg:max-w-[30rem] xl:max-w-[40rem] flex items-start justify-start">
                <img
                  src={post?.postImg}
                  className="w-fit max-h-[20rem] object-left rounded-md shadow-lg shadow-violet-700/50"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:hidden flex flex-col items-center w-full mt-2">
          <p className="break-words w-full ml-10 my-[0.4rem] text-gray-400 text-[20px]">
            {post?.message}
          </p>
          <div className="max-w-[30rem] flex items-center justify-center">
            <img
              src={post?.postImg}
              className="w-full h-full object-contain rounded-md border border-blue-800 shadow-lg shadow-cyan-500/40"
            />
          </div>
        </div>
        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <div className="flex flex-row gap-3 text-xs mt-4 justify-center">
          <button
            className={`${
              isVoted === "liked"
                ? "text-violet-600"
                : "bg-transparent text-white"
            } hover:text-violet-500 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center space-x-2 hover:scale-115`}
            onClick={() => handleVote("like")}
          >
            <Heart size={25} />
            <span>{post.likes}</span>
          </button>
          <p className="text-white font-medium flex items-center">
            {post?.likes} {post?.likes === 1 ? "Like" : "Likes"}
          </p>
          <button
            className={`${
              isVoted === "disliked"
                ? "text-violet-600"
                : "bg-transparent text-white"
            } hover:text-violet-500 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center space-x-2 hover:scale-115`}
            onClick={() => handleVote("dislike")}
          >
            <ThumbsDown size={20} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-300 w-full h-full">
        <Comments showAll={true} comments={post?.comments || []} />
        <CommentForm pid={post.id} handleSetPosts={handleSetPosts} />
      </div>
    </div>
  );
}

export default PostLarge;
