import ReactDOM from "react-dom";
import ChatInput from "./ChatInput";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import { IChat } from "../interfaces/chat";

const mockChats: IChat = {
  participants: ["user123", "user456"],
  messages: [
    {
      sentBy: {
        userId: "user123",
        username: "john_doe",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      },
      message: "Hey, how's it going?",
      img: null,
      dateSent: "2025-03-05T10:00:00Z",
    },
    {
      sentBy: {
        userId: "user456",
        username: "jane_smith",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      },
      message: "I'm good, thanks! What about you?",
      img: null,
      dateSent: "2025-03-05T10:05:00Z",
    },
    {
      sentBy: {
        userId: "user123",
        username: "john_doe",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      },
      message: "I'm doing well, just working on some projects.",
      img: null,
      dateSent: "2025-03-05T10:10:00Z",
    },
  ],
  lastMessageDate: "2025-03-05T10:10:00Z",
  seen: true,
};

interface IChatContainer {
  currentUserId: string;
  selectedFriend: { id: string; username: string };
  onClose: () => void;
}
function ChatContainer({
  currentUserId,
  selectedFriend,
  onClose,
}: IChatContainer) {
  const [chatMessages, setChatMessages] = useState<IChat | null>(null);
  useEffect(() => {
    console.log(currentUserId, selectedFriend);
    //TODO: Get chat between current user and chosen friend
    setChatMessages(mockChats);
  }, [currentUserId, selectedFriend]);

  return ReactDOM.createPortal(
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"
        onClick={onClose}
      ></div>

      <div className="h-screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[80%] md:h-[90%] bg-gradient-to-b from-gray-900 to-blue-950 rounded-xl  border border-blue-900 z-20">
        <button
          className="absolute right-3 top-2 text-lg bg-gray-800 hover:bg-gray-700 p-1 rounded-full"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 cursor-pointer text-white hover:text-gray-400"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="text-center mt-2 text-lg">{selectedFriend.username}</h2>{" "}
        {/* //TODO: CHANGE LATER */}
        <div className="h-full rounded-b-xl">
          <Chat chat={chatMessages} currentUserId={currentUserId} />
          <div className="h-[10%] px-2 py-1 rounded-b-xl border-t border-blue-900">
            <ChatInput />
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default ChatContainer;
