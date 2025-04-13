import ReactDOM from "react-dom";
import Chat from "./Chat";
import { useEffect } from "react";
import { io } from "socket.io-client";

// const mockChats: IChat = {
//   participants: ["user123", "user456"],
//   messages: [
//     {
//       sentBy: {
//         userId: "user123",
//         username: "john_doe",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
//       },
//       message: "Hey, how's it going?",
//       img: null,
//       dateSent: "2025-03-05T10:00:00Z",
//     },
//     {
//       sentBy: {
//         userId: "user456",
//         username: "jane_smith",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
//       },
//       message: "I'm good, thanks! What about you?",
//       img: null,
//       dateSent: "2025-03-05T10:05:00Z",
//     },
//     {
//       sentBy: {
//         userId: "user123",
//         username: "john_doe",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
//       },
//       message: "I'm doing well, just working on some projects.",
//       img: null,
//       dateSent: "2025-03-05T10:10:00Z",
//     },
//   ],
//   lastMessageDate: "2025-03-05T10:10:00Z",
//   seen: true,
// };

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
  const socket = io("http://localhost:4000");

  const handleSendMessageSignal = () => {
    socket.emit("sent_message", { uid: currentUserId, fid: selectedFriend.id });
  };

  useEffect(() => {
    socket.emit("join_socket", currentUserId);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-slate-800 opacity-50 z-60"
        onClick={onClose}
      ></div>

      <div className="h-screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-[80%] lg:w-[70%] md:h-[90%] bg-gray-800 rounded-xl  border border-slate-600 z-70">
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
        {/* TODO: CHANGE LATER */}
        <Chat
          handleSendMessageSignal={handleSendMessageSignal}
          selectedFriendId={selectedFriend.id}
          currentUserId={currentUserId}
          socket={socket}
        />
      </div>
    </>,
    document.body
  );
}

export default ChatContainer;
