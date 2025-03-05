import { useEffect, useState } from "react";

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
      //TODO: Get friends of current user

      try {
        setFriends({
          friends: [
            {
              id: "1",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
              username: "username",
            },
            {
              id: "1",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
              username: "username",
            },
            {
              id: "1",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
              username: "username",
            },
          ],
          requests: [],
        });
      } catch (err) {
        console.log(err);
        setError("Failed to get friends. Please try again.");
      }
      setIsLoading(false);
    };

    getUserFriends();
  }, [id]);
  return { friends, error, isLoading, setFriends };
}

export default useFriends;
