import { useContext } from "react";
import Error from "../components/Error";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";
import usePosts from "../hooks/usePosts";
import { AuthContext } from "../context/UserContext";

function Explore() {
  const { user } = useContext(AuthContext);
  //@ts-expect-error page wont load if no user
  const { posts, error, isLoading, setPosts } = usePosts("all", user.id);
  return (
    <>
      {isLoading && (
        <div className="h-screen w-full flex items-center">
          <Spinner />
        </div>
      )}
      {error && <Error error={error} />}
      {!isLoading && posts && <PostsList posts={posts} setPosts={setPosts} />}
    </>
  );
}

export default Explore;
