import { Link } from "react-router-dom";
import { Home, BadgePlus, Compass, User, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import { changeStatus } from "../services/users-services";

function Navigation() {
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
      <header className="hidden md:block h-screen min-w-[13rem] lg:min-w-[15rem] bg-gradient-to-b from-gray-900 to-blue-950 border-r border-blue-950 text-[20px] shadow-lg">
        <nav>
          <div className="flex flex-row justify-between p-3 border-b border-blue-950 mb-3">
            <div className="w-[4rem]">
              <img
                src={
                  user?.img ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s"
                }
                alt="userImg"
                className="w-full rounded-full border-2 border-cyan-500 shadow-md shadow-cyan-600/50"
              />
            </div>
            <div className="flex justify-around pl-2 flex-col w-[70%]">
              <p className="truncate text-cyan-400 font-medium">
                {user?.username}
              </p>
              <input
                value={status}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStatus(e.target.value)
                }
                onBlur={handleChangeStatus}
                className="truncate text-cyan-400 font-medium text-[15px] py-[1px]"
              />
            </div>
          </div>
          <ul className="flex flex-col pl-3 items-start h-40 justify-between mt-4 gap-5">
            <li>
              <Link
                to="/"
                className="flex flex-row items-center hover:scale-110 duration-300 text-cyan-300 hover:text-cyan-500"
              >
                <Home className="w-6 h-6 text-cyan-300 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="flex flex-row items-center hover:scale-110 duration-300 text-cyan-300 hover:text-cyan-500"
              >
                <BadgePlus className="w-6 h-6 text-cyan-300 mr-2" />
                Create a Post
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="flex flex-row items-center hover:scale-110 duration-300 text-cyan-300 hover:text-cyan-500"
              >
                <Compass className="w-6 h-6 text-cyan-300 mr-2" />
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                className="flex flex-row items-center hover:scale-110 duration-300 text-cyan-300 hover:text-cyan-500"
              >
                <User className="w-6 h-6 text-cyan-300 mr-2" />
                Account
              </Link>
            </li>
            <li>
              <button
                className="cursor-pointer flex flex-row items-center hover:scale-110 duration-300 text-red-400 hover:text-red-500"
                onClick={logout}
              >
                <LogOut className="w-6 h-6 text-red-400 mr-2" />
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <header className="block md:hidden w-full bg-gradient-to-b from-gray-900 to-blue-950 bottom-0 fixed border-t border-blue-800 shadow-lg">
        <nav>
          <ul className="py-3 w-[80%] m-auto flex flex-row justify-between items-center">
            <li>
              <Link to="/" className="hover:scale-110 duration-300">
                <Home className="w-6 h-6 text-cyan-300 hover:text-cyan-500" />
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="flex flex-row items-center hover:scale-110 duration-300 text-cyan-300 hover:text-cyan-500"
              >
                <BadgePlus className="w-6 h-6 text-cyan-300 mr-2" />
              </Link>
            </li>
            <li>
              <Link to="/explore" className="hover:scale-110 duration-300">
                <Compass className="w-6 h-6 text-cyan-300 hover:text-cyan-500" />
              </Link>
            </li>
            <li>
              <Link to="/user" className="hover:scale-110 duration-300">
                <User className="w-6 h-6 text-cyan-300 hover:text-cyan-500" />
              </Link>
            </li>
            <li>
              <button
                className="cursor-pointer hover:scale-110 duration-300"
                onClick={logout}
              >
                <LogOut className="w-6 h-6 text-red-400 hover:text-red-500" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
