import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, editPost, getPostById } from "../services/posts-services";
import { AuthContext } from "../context/UserContext";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Frown,
  ImageIcon,
  Loader2,
  Meh,
  Send,
  Smile,
  X,
  XIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const moods2 = [
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
    color: "bg-orange-400 text-black",
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

const CreateEdit = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { pid } = useParams();
  const isEditing = pid ? true : false;

  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [mood, setMood] = useState({
    selectedMood: "",
    toOpen: "",
  });

  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function getPost() {
      if (pid) {
        const { data, error } = await getPostById(pid);

        if (error) {
          setError(error.message);
        }
        setMood({ selectedMood: data.moods[0], toOpen: "" });
        setMessage(data.message);
        if (data.img) {
          setImage(data.postImg);
        }
      }
    }
    getPost();
  }, [pid]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  //TODO: Image uploading on post creation/edit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (message === "" && !image) {
      setError("Post must contain either a picture or a message.");
      return;
    }

    const postObj = {
      datePosted: new Date(),
      user: user?.id,
      message: message,
      postImg: image,
      moods: [mood.selectedMood],
    };

    if (isEditing) {
      //@ts-expect-error id added to object only on edit
      postObj.id = pid;
      //@ts-expect-error isEdited added to object only on edit
      postObj.isEdited = true;
      const { success, postId } = await editPost(postObj);

      if (!success) {
        setError("Editing post failed.");
        setIsSubmitting(false);
        return;
      }

      navigate(`/post/${postId}`);
    } else {
      const { success, postId } = await createPost(postObj);

      if (!success) {
        setError("Creating post failed.");
        setIsSubmitting(false);
        return;
      }

      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className="w-full h-full flex items-center px-2 sm:px-4">
      <div
        className={`w-full max-w-2xl m-auto ${
          isEditing && "bg-slate-700 rounded-lg shadow-xl"
        }`}
      >
        <p className="text-center p-2 text-lg sm:text-xl text-white">
          {isEditing && t("CreateEdit.edit")}
        </p>
        <form onSubmit={handleSubmit} className="p-0 md:p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <textarea
              value={message}
              onChange={(e) => handleMessageChange(e)}
              placeholder={t("CreateEdit.placeholder")}
              className="w-full min-h-[100px] sm:min-h-[120px] bg-[#c1d1ff] rounded-lg text-sm md:text-base p-3 sm:p-4 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-700 focus:border-transparent resize-none"
            />
            {error && (
              <p className="text-center text-sm text-red-500 font-light">
                {error}
              </p>
            )}
          </div>

          {image && (
            <div className="relative mb-4 sm:mb-6 group">
              <img
                src={image}
                alt="Selected"
                className="rounded-lg w-full max-h-[250px] sm:max-h-[300px] object-cover"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-75 rounded-full text-slate-900 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {mood.selectedMood && (
            <div className="mb-4 sm:mb-6 flex items-center">
              <div
                className={`px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r bg-[#c1d1ff] text-slate-900 flex items-center space-x-2`}
              >
                <span className="text-sm sm:text-base">
                  {t("CreateEdit.feeling")}{" "}
                  {t(
                    `MoodSelector.submoods.${mood.selectedMood
                      .toLowerCase()
                      .split(" ")
                      .join("")}`
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setMood({ selectedMood: "", toOpen: "" })}
                  className="ml-2 hover:text-gray-200 cursor-pointer transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex space-x-3 sm:space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-white hover:text-indigo-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 cursor-pointer"
              >
                <ImageIcon size={22} />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowMoodSelector(!showMoodSelector);
                    setMood({ selectedMood: "", toOpen: "" });
                  }}
                  className="text-white hover:text-yellow-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 cursor-pointer"
                >
                  <Smile size={22} />
                </button>
                {showMoodSelector && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    {/* Close on outside click */}
                    <div
                      className="absolute inset-0"
                      onClick={() => setShowMoodSelector(false)}
                    />

                    {/* Mood Selector Panel */}
                    <div className="relative z-60 animate-fadeIn scale-95 transition-all duration-300 w-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-4 flex flex-row justify-center flex-wrap gap-3 lg:max-w-xl max-h-[80vh] overflow-y-auto">
                      <button
                        className="absolute top-3 right-5 cursor-pointer"
                        onClick={() => setShowMoodSelector(false)}
                      >
                        <XIcon />
                      </button>
                      <div className="flex flex-row flex-wrap md:justify-center">
                        {moods2.map((m) => (
                          <div
                            key={m.label}
                            className={`p-3 rounded-xl transition-colors duration-200 ${
                              mood.selectedMood === m.label
                                ? "bg-gray-700"
                                : "hover:bg-gray-700"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 cursor-pointer">
                              <div className="flex items-center gap-2 text-sm text-gray-100">
                                <m.icon className="w-5 h-5 text-gray-300" />
                                {t(
                                  `MoodSelector.moods.${m.label.toLowerCase()}.main`
                                )}
                              </div>
                            </div>
                            {/* Always show submoods */}
                            <ul className="mt-2 pl-7 space-y-1 text-sm text-gray-300">
                              {m.submoods.map((el, index) => (
                                <li
                                  key={index}
                                  className="px-2 py-1 rounded flex flex-row items-center gap-2 hover:bg-gray-900 transition-colors cursor-pointer text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMood({
                                      selectedMood: el.label,
                                      toOpen: "",
                                    });
                                    setShowMoodSelector(false);
                                  }}
                                >
                                  <m.icon className="w-5 h-5 text-gray-300" />
                                  {t(
                                    `MoodSelector.moods.${m.label.toLowerCase()}.submoods.${el.label
                                      .toLowerCase()
                                      .split(" ")
                                      .join("")}`
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || (!message.trim() && !image)}
              className={`px-4 sm:px-6 py-2 rounded-full bg-violet-700 hover:bg-violet-600 font-medium flex items-center space-x-2 
              ${
                !message.trim() && !image
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              } 
              transition-all duration-200 transform hover:scale-105 cursor-pointer`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t("CreateEdit.submitting")}</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>{t("CreateEdit.submitBtn")}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEdit;
