import { Link } from "react-router-dom";
import { IComment } from "../interfaces/posts";

interface IComments {
  comments: IComment[];
  showAll: boolean;
}

function Comments({ comments, showAll }: IComments) {
  const displayedComments = !showAll ? comments.slice(0, 5) : comments;
  return (
    <ul
      className={`flex flex-col gap-5  rounded-xl p-2 mt-5 lg:ml-0 bg-gray-800 h-[18rem] overflow-y-scroll scrollbar-hide`}
    >
      <h2 className="text-center text-xs">Comments</h2>
      {displayedComments.length === 0 && (
        <p className="m-auto flex flex-col text-center text-[14px]">
          No comments yet{" "}
          <span className="text-gray-400">Be the first to comment</span>
        </p>
      )}
      {displayedComments.map((comment, index) => (
        <li className="flex flex-row gap-2" key={index}>
          <div className="w-[15%] sm:w-[6%] lg:w-[8%] xl:w-[6%]">
            <img
              src={comment.user.img}
              className="w-full rounded-full cursor-pointer"
            />
          </div>

          <div className="flex gap-2 flex-col text-sm w-full">
            <div className="flex flex-row gap-2">
              <Link
                to={`/user/${comment.user?.id}`}
                className="truncate text-xs cursor-pointer"
              >
                {comment.user.username}
              </Link>
              <p className="text-[12px] truncate text-gray-400">
                {comment.datePosted}
              </p>
            </div>
            <p className="text-xs w-full">{comment.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Comments;
