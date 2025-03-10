import { useParams } from "react-router-dom";
import { IPosts } from "../interfaces/posts";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import PostLarge from "../components/PostLarge";
import { getPostById } from "../services/posts-services";
import Error from "../components/Error";

function PostPage() {
  const { pid } = useParams();
  const [post, setPost] = useState<IPosts | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      const { data, error } = await getPostById(pid);

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      setPost(data);
      setIsLoading(false);
    };
    getPost();
    setIsLoading(false);
  }, [pid]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full overflow-hidden flex flex-row items-center justify-center rounded-xl h-full mb-16">
      <div className="w-full md:w-full m-auto flex items-center justify-center">
        {post && <PostLarge post={post} setPost={setPost} />}
        {error && (
          <div className="h-screen m-auto">
            <Error error={error} navigate="/" navigateMsg="Back to Dashboard" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostPage;
