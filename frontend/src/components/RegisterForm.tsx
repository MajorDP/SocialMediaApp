import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Input from "./Input";
import {
  arePasswordsMatching,
  isValidEmail,
  isValidLengthPassword,
  isValidLengthUsername,
} from "../validation/validation";

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
    if (isFormValid) await register(authData);
  };

  return (
    <form
      className="w-full flex flex-col items-center mt-20 text-xs sm:text-base"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mt-4 text-lg font-semibold">
        Create an account
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

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <button
        type="submit"
        className="mt-5 border px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:bg-gray-800 cursor-pointer"
        disabled={!isFormValid}
      >
        Sign Up
      </button>

      <button
        className="block mt-4 text-gray-400 text-xs cursor-pointer"
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
