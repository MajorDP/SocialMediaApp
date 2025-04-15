import { useEffect, useRef, useState } from "react";
import { IChat } from "../interfaces/chat";
import ChatInput from "./ChatInput";
import Error from "./Error";
import { handleGetChats } from "../services/chat-services";
import { Socket } from "socket.io-client";

interface IChatProps {
  currentUserId: string;
  selectedFriendId: string;
  handleSendMessageSignal: () => void;
  socket: Socket;
}

function Chat({
  handleSendMessageSignal,
  selectedFriendId,
  currentUserId,
  socket,
}: IChatProps) {
  const chatRef = useRef(null);
  const [chatMessages, setChatMessages] = useState<IChat | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getChat() {
      const { success, data } = await handleGetChats(
        currentUserId,
        selectedFriendId
      );

      if (!success) {
        setError("Could not load chat, please try again.");
        return;
      }

      setChatMessages(data);
    }
    getChat();
    socket.on("message_received", (id: string) => {
      if (id === currentUserId) {
        getChat();
      }
    });

    return () => {
      socket.off("message_received");
    };
  }, [currentUserId, selectedFriendId]);

  useEffect(() => {
    if (chatRef.current) {
      //@ts-expect-error ref
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="h-full rounded-b-xl">
      {error && <Error error={error} />}
      {chatMessages && (
        <>
          <ul
            className="w-full h-[85%] p-2 overflow-y-scroll scrollbar-hide"
            ref={chatRef}
          >
            {chatMessages &&
              chatMessages.messages.map((message, index) => {
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
                          className="shadow-md shadow-violet-700/50 max-w-[30px] sm:max-w-[50px] rounded-full"
                          alt={message.sentBy.username}
                        />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <p className="text-[12px] text-slate-500">
                        {message.dateSent.split("T")[0]}
                      </p>
                      {message.message && (
                        <p className="text-[16px] text-slate-700 sm:text-[18px]">
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
                          className="shadow-md shadow-violet-700/50 max-w-[30px] sm:max-w-[50px] rounded-full"
                          alt={message.sentBy.username}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
          <div className="w-full bg-[#c1d1ff] border-t border-slate-700 h-[10%] px-2 py-1 rounded-b-xl bg-gradient-to-b ">
            <ChatInput
              uid={currentUserId}
              fid={selectedFriendId}
              setChatMessages={setChatMessages}
              handleSendMessageSignal={handleSendMessageSignal}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
