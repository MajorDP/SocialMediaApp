import { useParams } from "react-router-dom";
import { IPosts } from "../interfaces/posts";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import PostLarge from "../components/PostLarge";
const mockPost = {
  id: "1",
  datePosted: "2025-02-20",
  user: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    username: "user1",
  },
  message: "This is my first post!",
  likes: 200,
  comments: [],
};
function PostPage() {
  const { pid } = useParams();
  const [post, setPost] = useState<IPosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      //TODO: Get post by pid functionality
      setPost(mockPost);
    };
    getPost();
    setIsLoading(false);
  }, [pid]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full overflow-hidden flex flex-row items-center justify-center rounded-xl mb-16">
      <div className="w-full md:w-full m-auto flex items-center justify-center">
        {post && <PostLarge post={post} setPost={setPost} />}
      </div>
    </div>
  );
}

export default PostPage;
