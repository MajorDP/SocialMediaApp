import React, { useState } from "react";
import { sendFriendRequest } from "../services/users-services";
import { useTranslation } from "react-i18next";

interface IAddFriendForm {
  id: string | null;
}
function AddFriendForm({ id }: IAddFriendForm) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "" });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, message } = await sendFriendRequest(id, username);

    setMessage({ success, message });
    setTimeout(() => {
      setMessage({ success: null, message: "" });
    }, 2000);

    setUsername("");
  };
  return (
    <>
      <h2 className="text-center pt-4 pb-2 font-semilight text-sm">
        {t("Account.friends.addFriends")}
      </h2>
      <form
        className="w-44 h-8 m-auto flex items-center justify-between border border-black rounded-md bg-slate-600 px-2 text-sm"
        onSubmit={handleSubmit}
      >
        <input
          className={`${
            message.success !== null
              ? message.success === true
                ? "placeholder-green-600"
                : "placeholder-red-500"
              : ""
          } outline-none py-1 w-32 text-xs text-white placeholder:text-start`}
          placeholder={
            message.message ? message.message : t("Account.friends.placeholder")
          }
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button disabled={!username}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </>
  );
}

export default AddFriendForm;
