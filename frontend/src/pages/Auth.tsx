import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-gradient-to-b from-[#78a6d4] to-[#382dd8] w-full h-screen">
      <div className="w-full h-[90%] md:w-[50%] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-slate-600 m-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-xl flex flex-row">
        <div className={`${!isLogin ? "flex" : "hidden"} w-full`}>
          <RegisterForm setIsLogin={setIsLogin} />
        </div>
        <div
          className={`${isLogin ? "flex" : "hidden"} w-full sm:items-center`}
        >
          <LoginForm setIsLogin={setIsLogin} />
        </div>
      </div>
    </div>
  );
}

export default Auth;
