import { useContext, useState } from "react";
import { IPosts } from "../interfaces/posts";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

interface IPostItem {
  post: IPosts;
  setPosts: React.Dispatch<React.SetStateAction<IPosts[] | null>>;
  isEditable?: boolean;
}

function PostSmall({ post, setPosts, isEditable = false }: IPostItem) {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  const handleVote = async (voteType: string) => {
    console.log(voteType);
    setError(null);
    //TODO: Handle voting functionality
  };

  const handleSetPosts = (data: IPosts) => {
    setPosts(
      (posts) =>
        posts?.map((currPost) => (currPost.id === data.id ? data : currPost)) ||
        null
    );
  };

  const handleDelete = (id: string) => {
    console.log(id);
    //TODO: Handle deleting functionality
  };

  const isVoted = user?.votes.liked.includes(post.id)
    ? "liked"
    : user?.votes.disliked.includes(post.id)
    ? "disliked"
    : null;

  return (
    <li className="border border-blue-900 flex flex-col w-full md:min-w-fit lg:w-full bg-gradient-to-b from-gray-900 to-blue-950 p-2 sm:p-3 rounded-2xl shadow-lg">
      <div>
        <div className="flex flex-row w-full p-3">
          <Link to="/user/1" className="w-[5rem] md:max-w-[15%] xl:max-w-[8%]">
            <img
              src={post.user.img}
              className="rounded-full w-fit border-2 border-cyan-400 cursor-pointer"
            />
          </Link>
          <div className="flex flex-col justify-start ml-2 w-[75%] xl:max-w-[85%]">
            <Link
              to="/user/1"
              className="text-sm sm:text-lg font-semibold text-cyan-400 cursor-pointer"
            >
              {post.user.username}
            </Link>
            <p className="text-xs text-blue-300">{post.datePosted}</p>
            <div className="hidden sm:flex flex-col w-full">
              <p className="break-words w-full my-2 text-gray-300 text-xs lg:text-[20px]">
                {post.message}
              </p>
              <div className="max-w-[20rem] lg:max-w-[30rem] xl:max-w-[40rem] flex items-start justify-start">
                <img
                  src={post?.img}
                  className="w-fit max-h-[20rem] object-left rounded-md border border-blue-800 shadow-lg shadow-cyan-500/40"
                />
              </div>
            </div>
          </div>
          {isEditable && (
            <div className=" gap-2 flex flex-col sm:flex-row text-xs sm:text-sm h-fit">
              <Link
                to={`/create/${post.id}`}
                className="text-center px-2 py-1 bg-orange-400 hover:bg-orange-500 hover:text-black hover:scale-105 duration-300 cursor-pointer rounded-xl border border-orange-400"
              >
                Edit
              </Link>
              <button
                className=" px-2 py-1 bg-red-500 hover:bg-red-600 hover:text-black hover:scale-105 duration-300 cursor-pointer rounded-xl border border-red-900"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="sm:hidden flex flex-col items-center w-full mt-2">
          <p className="break-words w-full ml-10 my-[0.4rem] text-gray-300 text-[20px]">
            {post.message}
          </p>
          <div className="max-w-[30rem] flex items-center justify-center">
            <img
              src={post?.img}
              className="w-full h-full object-contain rounded-md border border-blue-800 shadow-lg shadow-cyan-500/40"
            />
          </div>
        </div>
        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <div className="flex flex-row gap-3 mt-2 w-fit">
          <button
            className={`${
              isVoted === "liked"
                ? "bg-cyan-500 text-black"
                : "bg-transparent text-cyan-400"
            } hover:bg-cyan-400 hover:text-black px-2 sm:px-3 py-1 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500 border border-cyan-500 cursor-pointer`}
            onClick={() => handleVote("like")}
          >
            👍
          </button>
          <p className="text-gray-400 font-medium flex items-center text-[14px]">
            {post.likes} {post.likes === 1 ? "Like" : "Likes"}
          </p>
          <button
            className={`${
              isVoted === "disliked" ? "bg-red-500" : "bg-transparent"
            } hover:bg-red-400 hover:text-black px-2 sm:px-3 py-1 rounded-lg transition-all duration-200 shadow-md shadow-red-500 border border-red-500 cursor-pointer`}
            onClick={() => handleVote("dislike")}
          >
            👎
          </button>
          <div className="flex items-center">
            <button
              className="underline text-cyan-300 hover:text-cyan-400 cursor-pointer transition-all duration-150 text-[14px]"
              onClick={() => setShowComments(!showComments)}
            >
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "Comment" : "Comments"}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 w-full mt-4 ${
          showComments ? "h-[35rem]" : "h-0"
        }`}
      >
        <Comments showAll={false} comments={post.comments} />
        <div className="w-full mt-5 flex justify-center underline">
          <Link
            to={`/post/${post.id}`}
            className="text-[14px] text-cyan-300 hover:text-cyan-400 transition-all duration-150"
          >
            See All Comments ({post.comments.length})
          </Link>
        </div>
        <CommentForm pid={post.id} handleSetPosts={handleSetPosts} />
      </div>
    </li>
  );
}

export default PostSmall;
