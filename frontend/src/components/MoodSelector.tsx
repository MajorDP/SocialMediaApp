import { Smile, Frown, Brain, Trophy, Coffee, Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
import { setMood } from "../services/users-services";

const moods = [
  {
    icon: Smile,
    label: "Happy",
    color: "bg-gradient-to-br from-yellow-400 to-orange-500 text-black",
    glow: "#F59E0B",
  },
  {
    icon: Frown,
    label: "Sad",
    color: "bg-gradient-to-br from-blue-400 to-blue-600 text-black",
    glow: "#3B82F6",
  },
  {
    icon: Brain,
    label: "Stressed",
    color: "bg-gradient-to-br from-red-400 to-red-600 text-black",
    glow: "#EF4444",
  },
  {
    icon: Trophy,
    label: "Motivated",
    color: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-black",
    glow: "#10B981",
  },
  {
    icon: Coffee,
    label: "Relaxed",
    color: "bg-gradient-to-br from-purple-400 to-purple-600 text-black",
    glow: "#8B5CF6",
  },
  {
    icon: Heart,
    label: "Anxious",
    color: "bg-gradient-to-br from-pink-400 to-pink-600 text-black",
    glow: "#EC4899",
  },
];

function MoodSelector() {
  const { user, updateUser } = useContext(AuthContext);

  // Check if the last mood update was within the last 24 hours
  const isUpdatedToday =
    Date.now() - new Date(user?.mood?.lastUpdated || "").getTime() <
    24 * 60 * 60 * 1000;

  const [selectedMood, setSelectedMood] = useState({
    mood: "",
    desc: "",
  });

  const [isOpen, setIsOpen] = useState(!isUpdatedToday);

  useEffect(() => {
    if (isUpdatedToday && user?.mood) {
      setSelectedMood({
        mood: user.mood.currentMoods[0],
        desc: user.mood.desc,
      });
    }
  }, [isUpdatedToday, user?.mood]);

  const handleSubmitMood = async () => {
    //TODO: Update user's mood for posts algorithm and 24h chats
    const { success, userResponse } = await setMood(
      selectedMood.mood,
      selectedMood.desc,
      user?.id
    );
    if (success) {
      updateUser(userResponse);
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 md:rounded-lg shadow-lg flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-[40rem]" : "max-h-[5rem]"
      }`}
    >
      <h2
        className="text-sm text-center sm:text-xl mb-4 text-cyan-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        How are you feeling today?
      </h2>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-50 overflow-y-auto scrollbar-hide md:grid md:grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`${mood.color} ${
                mood.label === selectedMood.mood && "scale-95 duration-200"
              } p-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 shadow-md cursor-pointer text-xs md:text-base`}
              onClick={() =>
                setSelectedMood((prev) => {
                  return { ...prev, mood: mood.label };
                })
              }
            >
              <mood.icon size={24} />
              <span>{mood.label}</span>
            </button>
          ))}
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-300 flex flex-col items-center mt-5 ${
            selectedMood ? "max-h-[20rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-300">
            Share the reason for your mood{" "}
            <span className="text-gray-400">(Optional)</span>
          </p>
          <input
            value={selectedMood.desc}
            onChange={(e) =>
              setSelectedMood((prev) => {
                return { ...prev, desc: e.target.value };
              })
            }
            className="w-1/2 px-2 py-1 m-auto bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-transparent resize-none transition-all duration-200"
          />
          <button
            className="mt-2 px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-blue-800 to-fuchsia-950 text-cyan-200 hover:from-blue-800 hover:to-fuchsia-800 font-medium flex items-center space-x-2 cursor-pointer hover:scale-105 duration-200"
            onClick={handleSubmitMood}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoodSelector;
