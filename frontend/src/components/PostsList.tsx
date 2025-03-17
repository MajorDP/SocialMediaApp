import { IPosts } from "../interfaces/posts";
import PostSmall from "./PostSmall";

interface IPostsList {
  posts: IPosts[] | null;
  setPosts: React.Dispatch<React.SetStateAction<IPosts[] | null>>;
}

function PostsList({ posts, setPosts }: IPostsList) {
  return (
    <ul className="flex flex-col w-full md:w-full lg:max-w-full gap-y-5 items-center h-full overflow-y-scroll scrollbar-hide pt-2 p-4">
      {posts?.length === 0 && <p>No posts yet, maybe try a different mood?</p>}
      {posts?.map((post, index) => (
        <PostSmall post={post} setPosts={setPosts} key={index} />
      ))}
    </ul>
  );
}

export default PostsList;
