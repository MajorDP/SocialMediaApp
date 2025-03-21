import React, { useContext, useState } from "react";
import { IPosts } from "../interfaces/posts";
import { AuthContext } from "../context/UserContext";
import { postComment } from "../services/posts-services";
import { useTranslation } from "react-i18next";

interface ICommentForm {
  pid: string;
  handleSetPosts: (data: IPosts) => void;
}

function CommentForm({ pid, handleSetPosts }: ICommentForm) {
  const { t } = useTranslation();
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
      className="my-5 flex flex-col justify-center w-full sm:w-[90%] m-auto bg-gray-800 p-3 rounded-xl shadow-lg"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="text-[14px] sm:text-xs mb-2 text-white font-medium">
        {t("Post.leaveAComment")}{" "}
        <span className="block sm:inline text-[12px] sm:text-xs text-white">
          {t("Post.maxChars")}
        </span>
      </p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-gray-800 text-white text-sm px-3 py-2 resize-none rounded-md focus:outline-none ring-1 focus:ring-violet-700 transition-all duration-200 scrollbar-hide"
        maxLength={200}
      />
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      <button
        className="hover:bg-violet-600 text-white font-medium text-xs bg-violet-700 mt-3 px-4 py-2 rounded-xl w-24 sm:w-44 m-auto hover:scale-105 cursor-pointer duration-300 disabled:bg-gray-500 disabled:hover:scale-100 disabled:cursor-default"
        disabled={!comment}
      >
        {t("Post.comment")}
      </button>
    </form>
  );
}

export default CommentForm;
