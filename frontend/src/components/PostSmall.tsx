import { Heart, ThumbsDown } from "lucide-react";
import { IPosts } from "../interfaces/posts";
import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import { deletePost, updateVote } from "../services/posts-services";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

interface IPostItem {
  post: IPosts;
  setPosts: React.Dispatch<React.SetStateAction<IPosts[] | null>>;
  isEditable?: boolean;
}

function PostSmall({ post, setPosts, isEditable = false }: IPostItem) {
  const { user, updateUser } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  const handleVote = async (voteType: string) => {
    const { data, error } = await updateVote(user?.id, post.id, voteType);
    if (error) {
      setError(error.message);
    } else {
      setPosts(
        (posts) =>
          posts?.map((currPost) =>
            currPost.id === post.id ? data.post : currPost
          ) || []
      );

      updateUser(data.user);
      setError(null);
    }
  };
  const handleSetPosts = (data: IPosts) => {
    setPosts(
      (posts) =>
        posts?.map((currPost) => (currPost.id === data.id ? data : currPost)) ||
        null
    );
  };

  const handleDelete = async (pid: string) => {
    const { success } = await deletePost(pid);

    if (!success) {
      return;
    }

    setPosts((posts) => posts?.filter((post) => post.id !== pid) || []);
  };

  const isVoted = user?.votes.liked.includes(post.id)
    ? "liked"
    : user?.votes.disliked.includes(post.id)
    ? "disliked"
    : null;

  return (
    <div className="bg-gradient-to-br hover:to-green-700 from-[#032f5a] via-blue-950 to-violet-950 p-4 rounded-lg shadow-lg w-full">
      <div className="flex items-center space-x-3 mb-4 justify-between">
        <div className="flex flex-row gap-3">
          <img
            src={post.user.img}
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-100 flex flex-row items-center gap-2">
              {post.user.username}
              <span className="text-gray-400 text-xs">
                {post.datePosted.split("T")[0]}
                <span> {post.isEdited && "(Edited)"}</span>
              </span>
            </h3>

            <span className="text-sm text-gray-400">Status will go here</span>
          </div>
        </div>
        {isEditable && (
          <div className="flex flex-col gap-2 sm:flex-row text-xs sm:text-sm h-fit">
            <Link
              to={`/create/${post.id}`}
              className="text-center px-2 py-1 bg-orange-400 hover:bg-orange-500 hover:text-black hover:scale-105 duration-300 cursor-pointer rounded-xl border border-orange-400"
            >
              Edit
            </Link>
            <button
              className="px-2 py-1 bg-red-500 hover:bg-red-600 hover:text-black hover:scale-105 duration-300 cursor-pointer rounded-xl border border-red-900"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-300">{post.message}</p>
      <div className="mt-4 flex items-center sm:justify-start justify-center space-x-4">
        <button
          className={`${
            isVoted === "liked"
              ? "text-green-500"
              : "bg-transparent text-cyan-400"
          } hover:text-green-500 px-3 py-2 rounded-lg transition-all duration-300 shadow-md cursor-pointer flex items-center space-x-2`}
          onClick={() => handleVote("like")}
        >
          <Heart size={20} />
          <span>{post.likes}</span>
        </button>
        <p className="text-gray-400 font-medium flex items-center text-[14px]">
          {post.likes} {post.likes === 1 ? "Like" : "Likes"}
        </p>
        <button
          className={`${
            isVoted === "disliked" ? "text-red-800" : "text-red-400"
          } hover:text-red-800 px-3 py-2 rounded-lg transition-all duration-300 shadow-md cursor-pointer flex items-center space-x-2`}
          onClick={() => handleVote("dislike")}
        >
          <ThumbsDown size={20} />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-xs text-gray-400 cursor-pointer "
        >
          View comments
        </button>
      </div>
      {error && (
        <p className="text-center w-48 text-xs text-red-500">{error}</p>
      )}
      <div
        className={`overflow-hidden transition-all duration-300 w-full mt-4 ${
          showComments ? "h-[35rem]" : "h-0"
        }`}
      >
        <Comments showAll={false} comments={post.comments} />
        <div className="w-full mt-5 flex justify-center underline">
          <Link
            to={`/post/${post.id}`}
            className="text-xs text-cyan-300 hover:text-cyan-400 transition-all duration-150"
          >
            See All Comments ({post.comments.length})
          </Link>
        </div>
        <CommentForm pid={post.id} handleSetPosts={handleSetPosts} />
      </div>
    </div>
  );
}

export default PostSmall;
