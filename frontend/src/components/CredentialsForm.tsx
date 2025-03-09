import { useState } from "react";

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

function CredentialsForm() {
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Useremail.com");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !email) {
      setError("Username and Email are required.");
      return;
    }
    // TODO: Save updated user info
    console.log({ username, email, password, image, selectedCategories });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 h-screen mt-2 overflow-y-auto sm:overflow-y-auto scrollbar-hide pb-20"
    >
      <div className="flex flex-col items-center">
        <label className="text-cyan-400 text-sm">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <img
            src={
              image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s"
            }
            className="w-24 h-24 rounded-full border border-blue-800 shadow-lg shadow-cyan-500/40 cursor-pointer"
            alt="Profile Preview"
          />
        </label>
      </div>

      <div>
        <label className="text-cyan-400 text-sm">Username</label>
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="text-cyan-400 text-sm">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-cyan-400 text-sm">New Password</label>
        <input
          type="password"
          className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep current password"
        />
      </div>

      <div>
        <label className="text-cyan-400 text-sm">Category Preferences</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 bg-gray-900 rounded-md text-sm overflow-y-auto sm:overflow-y-hidden scrollbar-hide max-h-[20rem]">
          {categoryOptions.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 cursor-pointer truncate m-1"
            >
              <input
                type="checkbox"
                className="accent-cyan-500 w-4 h-4 cursor-pointer"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="truncate">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        className="disabled:bg-gray-600 disabled:shadow-none disabled:border-none bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500 border border-cyan-500 cursor-pointer text-black"
        disabled={!username || !email}
      >
        Save Changes
      </button>
    </form>
  );
}

export default CredentialsForm;
