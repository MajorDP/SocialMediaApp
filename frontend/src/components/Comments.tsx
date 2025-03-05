import { IComment } from "../interfaces/posts";

interface IComments {
  comments: IComment[];
  showAll: boolean;
}

function Comments({ comments, showAll }: IComments) {
  const displayedComments = !showAll ? comments.slice(0, 5) : comments;
  return (
    <ul
      className={`flex flex-col gap-5 border border-blue-900 rounded-xl p-2 mt-5 lg:ml-0 bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 h-[18rem]  overflow-y-scroll scrollbar-hide`}
    >
      <h2 className="text-center text-sm">Comments</h2>
      {displayedComments.length === 0 && (
        <p className="m-auto flex flex-col text-center text-[14px]">
          No comments yet{" "}
          <span className="text-gray-400">Be the first to comment</span>
        </p>
      )}
      {displayedComments.map((comment, index) => (
        <li className="flex flex-row gap-2" key={index}>
          <div className="w-[10%] sm:w-[8%]">
            <img
              src={comment.user.img}
              className="w-full rounded-full border border-cyan-400 cursor-pointer"
            />
          </div>

          <div className="flex gap-2 flex-col text-sm w-full">
            <div className="flex flex-row gap-2">
              <p className="truncate text-xs cursor-pointer">
                {comment.user.username}
              </p>
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
