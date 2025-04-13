import { Link } from "react-router-dom";
import { Home, BadgePlus, Compass, User, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import { changeStatus } from "../services/users-services";
import { useTranslation } from "react-i18next";

function Navigation() {
  const { t } = useTranslation();
  const { user, updateUser, logout } = useContext(AuthContext);
  const [status, setStatus] = useState(user?.status);

  const handleChangeStatus = async () => {
    const { success, newStatus } = await changeStatus(user?.id, status);

    if (success) {
      //@ts-expect-error user is of expected type
      updateUser({ ...user, status: newStatus });
    }
  };

  return (
    <>
      <header className="z-10 hidden md:block h-screen min-w-[13rem] lg:w-[10rem] bg-[#c1d1ff] text-[20px]">
        <nav>
          <div className="flex flex-row justify-between p-3 mb-3">
            <div className="w-[4rem]">
              <img
                src={user?.img || "https://example.com/user.jpg"}
                alt="User"
                className="w-full rounded-full shadow-md hover:shadow-slate-900 duration-200 cursor-pointer"
              />
            </div>
            <div className="flex flex-col w-[70%] pl-2">
              <p className="truncate text-slate-900">{user?.username}</p>
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                onBlur={handleChangeStatus}
                className="truncate text-slate-900 text-[15px] py-[1px] bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <ul className="flex flex-col pl-3 mt-4 gap-5 ">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center text-slate-900 hover:scale-105 duration-300"
              >
                <Home className="w-6 h-6 text-slate-900 mr-2" />{" "}
                {t("Navigation.dashboard")}
              </Link>
            </li>

            <li>
              <Link
                to="/explore"
                className="flex items-center text-slate-900 hover:scale-105 duration-300"
              >
                <Compass className="w-6 h-6 text-slate-900 mr-2" />
                {t("Navigation.explore")}
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                className="flex items-center text-slate-900 hover:scale-105 duration-300"
              >
                <User className="w-6 h-6 text-slate-900 mr-2" />
                {t("Navigation.account")}
              </Link>
            </li>
            <li>
              <button
                className="flex items-center text-slate-900 hover:scale-105 duration-300 cursor-pointer"
                onClick={logout}
              >
                <LogOut className="w-6 h-6 text-slate-900 mr-2" />
                {t("Navigation.signOut")}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Navigation Bar */}
      <header className="block md:hidden fixed bottom-0 w-full bg-[#c1d1ff] shadow-lg z-10 border border-slate-900">
        <nav>
          <ul className="py-3 w-[80%] m-auto flex justify-between items-center">
            <li>
              <Link to="/dashboard" className="hover:scale-110 duration-300">
                <Home className="w-6 h-6 text-slate-900" />
              </Link>
            </li>

            <li>
              <Link to="/explore" className="hover:scale-110 duration-300">
                <Compass className="w-6 h-6 text-slate-900" />
              </Link>
            </li>
            <li>
              <Link to="/user" className="hover:scale-110 duration-300">
                <User className="w-6 h-6 text-slate-900" />
              </Link>
            </li>
            <li>
              <button className="hover:scale-110 duration-300" onClick={logout}>
                <LogOut className="w-6 h-6 text-slate-900" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
