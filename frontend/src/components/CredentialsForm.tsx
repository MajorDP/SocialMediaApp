import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Modal from "./Modal";
import { handleUpdateUser } from "../services/users-services";

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
  const { user, updateUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [image, setImage] = useState<string | null>(user?.img || null);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    user?.preferences || []
  );

  const isChanged =
    selectedCategories.some(
      (category) => !user?.preferences.includes(category)
    ) ||
    user?.preferences.some((cat) => !selectedCategories.includes(cat)) ||
    user?.email !== email ||
    user?.username !== username ||
    password;

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isChanged) {
      setError("Username and Email are required.");
      return;
    }

    const data = await handleUpdateUser({
      id: user?.id,
      img: image,
      email: email,
      username: username,
      password: password,
      categories: selectedCategories,
      confirmPassword: confirmPassword,
    });

    if (!data?.success) {
      setError(data?.data);
      setConfirmPassword("");
      setIsOpen(false);
      return;
    }

    updateUser(data.data.userResponse);
    setError(null);
    setConfirmPassword("");
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full h-full bg-gradient-to-b from-gray-900 to-blue-950 flex flex-col gap-5 p-4 border border-blue-900 rounded-xl">
          <h2 className="text-lg text-center font-semibold">Save changes</h2>
          <div className="text-center flex flex-col gap-5 text-balance text-sm">
            <p>Are you sure you want to save those changes to your account?</p>
            <div className="flex flex-col gap-2">
              <label className="text-cyan-400 text-sm">
                Confirm your password
              </label>
              <input
                type="password"
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="flex flex-row justify-center gap-5">
              <button
                className="px-2 py-1 hover:bg-red-700 bg-red-800 rounded-md cursor-pointer hover:scale-105 duration-200"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>

              <button
                className="px-2 py-1 hover:bg-green-600 bg-green-700 rounded-md cursor-pointer hover:scale-105 duration-200"
                onClick={handleSubmit}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <form className="flex flex-col gap-4 h-screen mt-2 overflow-y-auto sm:overflow-y-auto scrollbar-hide pb-20">
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
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-cyan-400 text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
            value={email || ""}
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
          className="disabled:bg-gray-600 disabled:shadow-none disabled:border-none bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500 border border-cyan-500 cursor-pointer text-black"
          disabled={!isChanged}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          Save Changes
        </button>
      </form>
    </>
  );
}

export default CredentialsForm;
