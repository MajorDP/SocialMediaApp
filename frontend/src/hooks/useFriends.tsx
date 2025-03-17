import { useContext, useEffect, useState } from "react";
import { getFriends } from "../services/users-services";
import { AuthContext } from "../context/UserContext";

interface IFriends {
  friends:
    | Array<{
        id: string;
        img: string;
        username: string;
        status: string;
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

function useFriends(id: string) {
  const { user } = useContext(AuthContext);
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
  }, [id, user]);
  return { friends, error, isLoading, setFriends };
}

export default useFriends;
