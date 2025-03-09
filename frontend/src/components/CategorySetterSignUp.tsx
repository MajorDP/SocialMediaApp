import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPreferences } from "../services/users-services";
import { AuthContext } from "../context/UserContext";
import Error from "./Error";

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

function CategorySetterSignUp() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);
  console.log(user);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSkip = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSetPreferences = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const { success, userResponse } = await setPreferences(
      selectedCategories,
      user?.id
    );

    if (!success) {
      setError("Could not set preferences, please try again later.");
      return;
    }

    updateUser(userResponse);
    navigate("/");
  };

  return (
    <div className="w-full gap-5 sm:gap-10 flex flex-col">
      <h2 className="text-center mt-4 text-lg font-semibold flex flex-col">
        Choose your preferences <span className="text-gray-500">(up to 5)</span>
      </h2>{" "}
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
      {error && (
        <p>
          <Error error={error} />
        </p>
      )}
      <div className="flex flex-row">
        <button
          className="border w-24 m-auto px-4 py-2 rounded-xl bg-slate-700 duration-300 hover:bg-slate-600 disabled:bg-gray-800 cursor-pointer flex items-center justify-center"
          onClick={(e) => handleSkip(e)}
        >
          Skip
        </button>
        <button
          onClick={handleSetPreferences}
          type="submit"
          className="border w-24 m-auto px-4 py-2 rounded-xl bg-green-700 duration-300 hover:bg-green-600 disabled:bg-gray-800 cursor-pointer flex items-center justify-center"
          disabled={selectedCategories.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CategorySetterSignUp;
