import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full h-[90%] md:w-[50%] bg-gradient-to-b from-gray-900 to-blue-950 border border-blue-900 m-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-xl flex flex-row">
      <div className={`${!isLogin ? "flex" : "hidden"} w-full`}>
        <RegisterForm setIsLogin={setIsLogin} />
      </div>
      <div className={`${isLogin ? "flex" : "hidden"} w-full sm:items-center`}>
        <LoginForm setIsLogin={setIsLogin} />
      </div>
    </div>
  );
}

export default Auth;
