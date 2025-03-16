import { useState } from "react";

interface IInput {
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validators?: ((el: string) => { isValid: boolean; message: string | null })[];
  onValidationChange?: (isValid: boolean) => void;
}

function Input({
  label,
  value,
  type,
  onChange,
  validators = [],
  onValidationChange = () => {},
}: IInput) {
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  const checkIsValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const validationErrors = validators
      .map((validator) => validator(e.target.value))
      .find((result) => !result.isValid);

    setError(validationErrors ? validationErrors.message : null);
    onValidationChange(!validationErrors);
  };

  return (
    <div className="flex flex-col">
      <label>
        <p className="text-cyan-200">{label}</p>
        <span className="text-red-500 text-xs">
          {" "}
          {isTouched && error ? error : null}{" "}
        </span>
      </label>
      <input
        type={type}
        className={`border ${
          isTouched && error
            ? "border-red-500 focus:outline-red-500"
            : "border-cyan-200 focus:ring-cyan-500 focus:ring-2"
        } bg-gray-800 rounded-md px-2 py-1`}
        value={value}
        onChange={checkIsValid}
        onFocus={() => setIsTouched(true)}
      />
    </div>
  );
}

export default Input;
