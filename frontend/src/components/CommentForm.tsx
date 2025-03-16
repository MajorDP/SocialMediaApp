import React, { useContext, useState } from "react";
import { IPosts } from "../interfaces/posts";
import { AuthContext } from "../context/UserContext";
import { postComment } from "../services/posts-services";

interface ICommentForm {
  pid: string;
  handleSetPosts: (data: IPosts) => void;
}
function CommentForm({ pid, handleSetPosts }: ICommentForm) {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await postComment(user?.id, pid, comment);

    if (error) {
      setError(error.message);
    } else {
      handleSetPosts(data);
      setComment("");
      setError(null);
    }
  };
  return (
    <form
      className="my-5 flex flex-col justify-center w-full sm:w-[90%] m-auto bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-3 rounded-xl shadow-lg"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="text-[14px] sm:text-xs mb-2 text-white font-medium">
        Leave a comment{" "}
        <span className="block sm:inline text-[12px] sm:text-xs text-white">
          (Max. 200 characters)
        </span>
      </p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-gray-800 text-white text-sm px-3 py-2 resize-none rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all duration-200 scrollbar-hide"
        maxLength={200}
      />
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      <button
        className="hover:bg-cyan-500 text-black font-medium text-xs bg-cyan-400 mt-3 px-4 py-2 rounded-xl w-24 sm:w-44 m-auto hover:scale-105 cursor-pointer duration-300 shadow-md shadow-cyan-500/50 border border-cyan-600 disabled:bg-gray-500 disabled:cursor-default"
        disabled={!comment}
      >
        Comment
      </button>
    </form>
  );
}

export default CommentForm;
