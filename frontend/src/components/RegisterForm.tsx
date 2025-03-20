import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Input from "./Input";
import {
  arePasswordsMatching,
  isValidEmail,
  isValidLengthPassword,
  isValidLengthUsername,
} from "../validation/validation";
import { Link } from "react-router-dom";

interface IRegisterForm {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterForm({ setIsLogin }: IRegisterForm) {
  const { error, register } = useContext(AuthContext);
  const [authData, setAuthData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      await register(authData);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center mt-20 text-xs sm:text-base"
      onSubmit={handleSubmit}
    >
      <Link to="/" className="text-4xl md:text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-blue-800 to-fuchsia-500 bg-clip-text text-transparent">
          ~
        </span>
        <span className=" text-white">MoodShare</span>
        <span className="bg-gradient-to-r from-blue-800 to-fuchsia-500 bg-clip-text text-transparent">
          ~
        </span>
      </Link>
      <h2 className="text-center text-xl font-semibold text-cyan-200">
        Create an Account
      </h2>

      <div className="flex flex-col w-44 sm:w-fit mt-10">
        <Input
          type="email"
          label="Email"
          value={authData.email}
          onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
          validators={[isValidEmail]}
          onValidationChange={setIsFormValid}
        />
      </div>

      <div className="flex flex-col w-44 sm:w-fit mt-3">
        <Input
          label="Username"
          type="text"
          value={authData.username}
          onChange={(e) =>
            setAuthData({ ...authData, username: e.target.value })
          }
          validators={[isValidLengthUsername]}
          onValidationChange={setIsFormValid}
        />
      </div>

      <div className="flex flex-col w-44 sm:w-fit mt-3">
        <Input
          label="Password"
          type="password"
          value={authData.password}
          onChange={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
          validators={[isValidLengthPassword]}
          onValidationChange={setIsFormValid}
        />
      </div>

      <div className="flex flex-col w-44 sm:w-fit mt-3">
        <Input
          label="Repeat Password"
          type="password"
          value={authData.repeatPassword}
          onChange={(e) =>
            setAuthData({ ...authData, repeatPassword: e.target.value })
          }
          validators={[arePasswordsMatching(authData.password)]}
          onValidationChange={setIsFormValid}
        />
      </div>

      {error && <p className="mt-2 text-red-500 font-semibold">{error}</p>}

      <button
        type="submit"
        className="mt-5 disabled:bg-gray-600 disabled:shadow-none disabled:border-none bg-violet-700 hover:bg-violet-600 transition-colors px-4 py-2 rounded-full duration-200 shadow-md enabled:shadow-cyan-800 disabled:shadow-gray-600 cursor-pointer text-white"
        disabled={!isFormValid}
      >
        Sign Up
      </button>

      <button
        type="submit"
        className="block mt-4 text-slate-200 text-xs cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setIsLogin((prev) => !prev);
        }}
      >
        Already have an account?
      </button>
    </form>
  );
}

export default RegisterForm;
