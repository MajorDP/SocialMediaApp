import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Modal from "./Modal";
import { handleUpdateUser } from "../services/users-services";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation();
  const { user, updateUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [image, setImage] = useState<string | null>(user?.img || null);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isChanged =
    user?.email !== email || user?.username !== username || password;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isChanged) {
      setError("Username and Email are required.");
      return;
    }

    const data = await handleUpdateUser({
      id: user?.id,
      img: image,
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!data?.success) {
      setError(data?.data);
      setConfirmPassword("");
      setIsOpen(false);
      return;
    }

    updateUser(data.data.userResponse);
    setError(null);
    setConfirmPassword("");
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full h-full bg-gray-800 border border-slate-600 flex flex-col gap-5 p-4 rounded-xl">
          <h2 className="text-lg text-center font-semibold">
            {t("Account.settings.saveBtn")}
          </h2>
          <div className="text-center flex flex-col gap-5 text-balance text-sm">
            <p>{t("Account.settings.saveMsg")}</p>
            <div className="flex flex-col gap-2">
              <label className="text-cyan-200 text-sm">
                {t("Account.settings.confirmPassword")}
              </label>
              <input
                type="password"
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-center gap-5">
              <button
                className="px-2 py-1 hover:bg-red-700 bg-red-800 rounded-md cursor-pointer hover:scale-105 duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("Account.settings.no")}
              </button>

              <button
                className="px-2 py-1 hover:bg-green-600 bg-green-700 rounded-md cursor-pointer hover:scale-105 duration-200"
                onClick={handleSubmit}
              >
                {t("Account.settings.yes")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <form className="flex flex-col gap-4 h-screen mt-2 overflow-y-auto sm:overflow-y-auto scrollbar-hide pb-20">
        <div className="flex flex-col items-center">
          <label className="text-cyan-200 text-sm">
            {t("Account.settings.pfp")}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <img
              src={
                image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s"
              }
              className="w-24 h-24 rounded-full shadow-lg shadow-violet-700/50 cursor-pointer"
              alt="Profile Preview"
            />
          </label>
        </div>

        <div>
          <label className="text-cyan-200 text-sm">
            {t("Account.settings.username")}
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-cyan-200 text-sm">
            {t("Account.settings.email")}
          </label>
          <input
            type="email"
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-cyan-200 text-sm">
            {t("Account.settings.newPassword")}
          </label>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("Account.settings.newPassPlaceholder")}
          />
        </div>

        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <button
          className="disabled:bg-gray-600  bg-violet-700 hover:bg-violet-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-md w-fit mx-auto cursor-pointer text-white"
          disabled={!isChanged}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          {t("Account.settings.saveBtn")}
        </button>
      </form>
    </>
  );
}

export default Settings;
