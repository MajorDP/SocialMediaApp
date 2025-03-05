import { useState } from "react";
import { XCircleIcon } from "lucide-react";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle sending messages between users in real time

    setMessage("");
    setImage("");
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <form
      className="w-[80%] flex flex-row items-center m-auto border border-blue-700 rounded-xl px-2 py-1 gap-3 h-fit relative"
      onSubmit={handleSend}
    >
      {image && (
        <div className="absolute -top-14 left-0 flex items-center gap-2 bg-white border border-gray-300 rounded-md p-1 shadow-md">
          <img
            src={image}
            alt="Selected"
            className="w-10 h-10 object-cover rounded-md border"
          />
          <button
            type="button"
            onClick={removeImage}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="w-fit flex cursor-pointer relative">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 z-30 cursor-pointer"
          onChange={handleImageChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6 hover:text-gray-400 z-20 cursor-pointer hover:scale-105 duration-200 text-blue-300"
        >
          <path
            fillRule="evenodd"
            d="M12 2a1 1 0 0 1 1 1v10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L11 13.586V3a1 1 0 0 1 1-1z"
            clipRule="evenodd"
          />
          <path d="M4 15a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4a1 1 0 1 0 0 2h4v3H4v-3h4a1 1 0 1 0 0-2H4z" />
        </svg>
      </div>

      <div className="w-full h-10">
        <textarea
          className="border border-blue-700 rounded-md px-2 py-1 h-full w-full resize-none scrollbar-hide focus:outline-0 leading-relaxed text-xs"
          value={message}
          onChange={handleMessageChange}
        />
      </div>

      <button className="border border-blue-800 px-1 sm:px-2 py-1 rounded-xl hover:scale-105 hover:bg-cyan-500 text-black font-medium text-xs bg-cyan-400 cursor-pointer duration-200">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
