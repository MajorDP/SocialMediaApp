import { useContext, useEffect, useState } from "react";
import { getPosts } from "../services/posts-services";
import { IPosts } from "../interfaces/posts";
import { AuthContext } from "../context/UserContext";

function usePosts(sortValue: string, userId: string) {
  const { user } = useContext(AuthContext);
  const [postsData, setPostsData] = useState<IPosts[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(postsData);
  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await getPosts(
        sortValue,
        user?.mood.currentMoods[0],
        userId
      );
      if (data) {
        setPostsData(data);
        setIsLoading(false);
      }
      if (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [sortValue, user, userId]);

  return {
    posts: postsData,
    setPosts: setPostsData,
    error: error,
    isLoading: isLoading,
  };
}

export default usePosts;
