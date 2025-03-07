import { useEffect, useState } from "react";
import { getFriends } from "../services/users-services";

interface IFriends {
  friends:
    | Array<{
        id: string;
        img: string;
        username: string;
      }>
    | [];
  requests:
    | Array<{
        id: string;
        img: string;
        username: string;
      }>
    | [];
}

function useFriends(id: string | null) {
  const [friends, setFriends] = useState<
    IFriends | { friends: []; requests: [] }
  >({
    friends: [],
    requests: [],
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserFriends = async () => {
      if (!id) return;

      try {
        const { data, error } = await getFriends(id);
        if (error) {
          setError(error);
          return;
        }

        setFriends(data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch friends. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getUserFriends();
  }, [id]);
  return { friends, error, isLoading, setFriends };
}

export default useFriends;
