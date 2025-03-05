import { useEffect, useState } from "react";
import { getPosts } from "../services/posts-services";
import { IPosts } from "../interfaces/posts";

function usePosts(sortValue: string, userId: string) {
  const [postsData, setPostsData] = useState<IPosts[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setError(null);
      try {
        const { data, error } = await getPosts(sortValue, userId);
        if (error) {
          throw new Error(error);
        }
        setPostsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
    setIsLoading(false);
  }, [sortValue, userId]);

  return {
    posts: postsData,
    setPosts: setPostsData,
    error: error,
    isLoading: isLoading,
  };
}

export default usePosts;
