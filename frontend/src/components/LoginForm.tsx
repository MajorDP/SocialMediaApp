import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
import Input from "./Input";

interface ILoginForm {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ setIsLogin }: ILoginForm) {
  const { error, login } = useContext(AuthContext);

  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) await login(authData);
  };

  return (
    <form
      className="w-full flex flex-col items-center mt-20 sm:mt-0 text-xs sm:text-base"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mt-4 text-xl font-semibold">Sign In</h2>

      <div className="flex flex-col w-fit mt-10">
        <Input
          type="email"
          label="Email"
          value={authData.email}
          onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
          onValidationChange={setIsFormValid}
        />
      </div>

      <div className="flex flex-col w-fit mt-3">
        <Input
          label="Password"
          type="password"
          value={authData.password}
          onChange={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
          onValidationChange={setIsFormValid}
        />
      </div>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!isFormValid}
        className="mt-5 border px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:bg-gray-800 cursor-pointer"
      >
        Sign In
      </button>

      <button
        className="block mt-4 text-gray-400 text-xs cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setIsLogin((prev) => !prev);
        }}
      >
        Don't have an account?
      </button>
    </form>
  );
}

export default LoginForm;
