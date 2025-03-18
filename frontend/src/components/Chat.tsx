import { useEffect, useRef } from "react";
import { IChat } from "../interfaces/chat";

interface IChatProps {
  chat: IChat | null;
  currentUserId: string;
}

function Chat({ chat, currentUserId }: IChatProps) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      //@ts-expect-error ref
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <ul
      className="w-full h-[85%] p-2 overflow-y-scroll scrollbar-hide"
      ref={chatRef}
    >
      {chat &&
        chat.messages.map((message, index) => {
          const isCurrentUser = message.sentBy.id === currentUserId;

          return (
            <li
              key={index}
              className={`flex mt-5 gap-2 ${
                isCurrentUser ? "justify-end text-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <div>
                  <img
                    src={message.sentBy.img}
                    className="shadow-md shadow-cyan-600/50 max-w-[30px] sm:max-w-[50px] rounded-full"
                    alt={message.sentBy.username}
                  />
                </div>
              )}

              <div className="flex flex-col">
                <p className="text-[12px] text-gray-400">
                  {message.dateSent.split("T")[0]}
                </p>
                {message.message && (
                  <p className="text-[16px] sm:text-[18px]">
                    {message.message}
                  </p>
                )}
                {message.img && (
                  <img
                    src={message.img}
                    className="max-w-[200px]"
                    alt="Message Content"
                  />
                )}
              </div>

              {isCurrentUser && (
                <div>
                  <img
                    src={message.sentBy.img}
                    className="shadow-md shadow-cyan-600/50 max-w-[30px] sm:max-w-[50px] rounded-full"
                    alt={message.sentBy.username}
                  />
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default Chat;
