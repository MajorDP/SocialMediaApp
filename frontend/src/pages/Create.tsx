import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mockPost = {
  id: "1",
  datePosted: "2025-02-20",
  user: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    username: "user1",
  },
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
  message: "This is my first post!",
  likes: 200,
  comments: [],
  categories: ["Technology"],
};

const Create = () => {
  const { id } = useParams(); // Get the post ID from URL (if editing)
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  useEffect(() => {
    if (id) {
      // Simulating fetching the post data (replace this with actual API call)
      setMessage(mockPost.message);
      if (mockPost.img) {
        setImage(mockPost.img);
      }
      setCategories(mockPost.categories);
      setIsEditing(true);
    }
  }, [id]);

  const categoryOptions = [
    "Technology",
    "Health",
    "Education",
    "Entertainment",
    "Sports",
    "News",
    "MMA",
    "Parties",
    "Politics",
    "Games",
    "Reality",
    "Popular",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);
    setMessage(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "" && !image) {
      setError("Post must contain either a picture or a message.");
      return;
    }

    if (isEditing) {
      // TODO: Add API request to update post
    } else {
      // TODO: Add API request to create post
    }
  };

  return (
    <div className="w-full h-fit sm:h-screen flex items-center justify-center rounded-xl pb-14 sm:pb-0">
      <div className="border border-blue-900 flex flex-col w-full md:max-w-[80%] bg-gradient-to-b from-gray-900 to-blue-950 p-4 sm:p-5 rounded-2xl shadow-lg">
        <h2 className="text-cyan-400 text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Post" : "Create a Post"}
        </h2>

        {error && <p className="text-center text-xs text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-cyan-400"
            rows={4}
            placeholder="Write something..."
            value={message}
            onChange={handleMessageChange}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />

          {image && (
            <div className="flex items-center justify-center">
              <img
                src={image}
                className="max-h-40 rounded-md border border-blue-800 shadow-lg shadow-cyan-500/40"
                alt="Preview"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h3 className="text-cyan-400 text-sm font-semibold">
              Select Categories (up to 5):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 p-2 bg-gray-900 rounded-md text-sm overflow-y-scroll scrollbar-hide max-h-[15rem] sm:max-h-[20rem]">
              {categoryOptions.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-white truncate"
                  title={category}
                >
                  <input
                    type="checkbox"
                    value={category}
                    checked={categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="accent-cyan-500 sm:min-w-5 sm:min-h-5"
                  />
                  <span className="truncate w-full block">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="disabled:bg-gray-600 disabled:shadow-none disabled:border-none bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500 border border-cyan-500 cursor-pointer text-black"
            disabled={(!message && !image) || categories.length > 5}
          >
            {isEditing ? "Update Post" : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
