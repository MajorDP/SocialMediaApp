import { Smile, Frown, AlertCircle, Meh, Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
import { setMood } from "../services/users-services";
import { useTranslation } from "react-i18next";
import CreateEdit from "./CreateEdit";

const moods = [
  {
    icon: Smile,
    label: "Happy",
    color: "bg-green-400 text-black",
    submoods: [
      { label: "Joyful" },
      { label: "Content" },
      { label: "Excited" },
      { label: "Prideful" },
    ],
  },
  {
    icon: Frown,
    label: "Sad",
    color: "bg-blue-400 text-black",
    submoods: [
      { label: "Grief" },
      { label: "Disappointed" },
      { label: "Lonely" },
      { label: "Guilty" },
    ],
  },
  {
    icon: AlertCircle,
    label: "Scared",
    color: "bg-orange-500 text-black",
    submoods: [
      { label: "Anxious" },
      { label: "Panicked" },
      { label: "Uneasy" },
      { label: "Shaky" },
    ],
  },
  {
    icon: Meh,
    label: "Angry",
    color: "bg-red-400 text-black",
    submoods: [
      { label: "Frustrated" },
      { label: "Rage" },
      { label: "Irritated" },
      { label: "Ticked off" },
    ],
  },
  {
    icon: Eye,
    label: "Surprised",
    color: "bg-yellow-400 text-black",
    submoods: [
      { label: "Amazed" },
      { label: "Shocked" },
      { label: "Confused" },
      { label: "Baffled" },
    ],
  },
  {
    icon: EyeOff,
    label: "Disgusted",
    color: "bg-green-400 text-black",
    submoods: [
      { label: "Repulsed" },
      { label: "Grossed out" },
      { label: "Turned off" },
      { label: "Offended" },
    ],
  },
];

function MoodSelector() {
  const { t } = useTranslation();
  const { user, updateUser } = useContext(AuthContext);

  // Check if the last mood update was within the last 24 hours
  const isUpdatedToday =
    Date.now() - new Date(user?.mood?.lastUpdated || "").getTime() <
    24 * 60 * 60 * 1000;

  const [selectedMood, setSelectedMood] = useState({
    mood: "",
    desc: "",
    toOpen: "",
  });

  const [isOpenMood, setIsOpenMood] = useState(!isUpdatedToday);
  const [isOpenPost, setIsOpenPost] = useState(!isUpdatedToday);

  useEffect(() => {
    if (isUpdatedToday && user?.mood) {
      setSelectedMood({
        mood: user.mood.currentMoods[0],
        desc: user.mood.desc,
        toOpen: "",
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
      setIsOpenMood(false);
      setIsOpenPost(true);
    }
  };

  return (
    <div
      className={`bg-slate-800 p-6 md:rounded-lg shadow-lg flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
        isOpenMood || isOpenPost
          ? "max-h-[40rem]"
          : "max-h-[10rem] md:max-h-[5rem]"
      }`}
    >
      <div className="flex flex-row justify-center gap-10">
        <h2
          className="text-sm text-center sm:text-xl mb-4 text-white cursor-pointer"
          onClick={() => {
            setSelectedMood({
              mood: user?.mood.currentMoods[0] || "",
              desc: user?.mood.desc || "",
              toOpen: "",
            });
            setIsOpenMood(!isOpenMood);
            setIsOpenPost(false);
          }}
        >
          {t("MoodSelector.message")}
        </h2>
        <h2
          className="text-sm text-center sm:text-xl mb-4 text-white cursor-pointer"
          onClick={() => {
            setIsOpenPost(!isOpenPost);
            setIsOpenMood(false);
          }}
        >
          {t("MoodSelector.post")}
        </h2>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpenMood ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-[18rem] overflow-y-auto scrollbar-hide md:grid md:grid-cols-3 gap-4">
          {moods.map((mood) =>
            selectedMood.toOpen === mood.label ? (
              <div className="bg-slate-900 h-full w-full grid grid-cols-2 gap-1">
                {mood.submoods.map((submood) => (
                  <button
                    className={`${
                      selectedMood.mood === submood.label && "scale-95"
                    } ${
                      mood.color
                    } text-slate-900 h-15 sm:h-full rounded-lg w-full space-x-0 lg:space-x-2 flex flex-col lg:flex-row justify-center items-center hover:opacity-90 shadow-md cursor-pointer text-xs lg:text-base`}
                    onClick={() =>
                      setSelectedMood((prev) => {
                        return { ...prev, mood: submood.label };
                      })
                    }
                  >
                    <mood.icon size={24} />
                    <p>
                      {t(
                        `MoodSelector.moods.${mood.label.toLowerCase()}.submoods.${submood.label
                          .toLowerCase()
                          .split(" ")
                          .join("")}`
                      )}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <button
                key={mood.label}
                className={`${mood.color} text-slate-900 h-full p-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 shadow-md cursor-pointer text-xs md:text-base`}
                onClick={() =>
                  setSelectedMood((prev) => {
                    return { ...prev, mood: "", toOpen: mood.label };
                  })
                }
              >
                <mood.icon size={24} />
                <span>
                  {t(`MoodSelector.moods.${mood.label.toLowerCase()}.main`)}
                </span>
              </button>
            )
          )}
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-300 flex flex-col items-center mt-5 ${
            selectedMood ? "max-h-[20rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-white text-center text-sm md:text-base">
            {t("MoodSelector.reason")}{" "}
            <span className="text-gray-200">{t("MoodSelector.optional")}</span>
          </p>
          <input
            value={selectedMood.desc}
            onChange={(e) =>
              setSelectedMood((prev) => {
                return { ...prev, desc: e.target.value };
              })
            }
            className="w-1/2 px-2 py-1 m-auto text-sm mt-2 md:mt-0 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-transparent resize-none transition-all duration-200"
          />
          <button
            className="mt-2 px-4 sm:px-6 py-2 rounded-full disabled:bg-gray-600 bg-violet-700 hover:bg-violet-600 font-medium flex items-center space-x-2 cursor-pointer hover:scale-105 duration-200"
            onClick={handleSubmitMood}
            disabled={selectedMood.mood === ""}
          >
            {t("MoodSelector.submitBtn")}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpenPost ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
        } `}
      >
        <CreateEdit />
      </div>
    </div>
  );
}

export default MoodSelector;
