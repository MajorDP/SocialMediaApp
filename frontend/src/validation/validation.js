const MIN_LENGTH_USERNAME = 5;
const MIN_LENGTH_PASSWORD = 7;
const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

export const isValidLengthUsername = (value) => {
  return value.length >= MIN_LENGTH_USERNAME
    ? { isValid: true, message: null }
    : { isValid: false, message: "Username is too short." };
};

export const isValidLengthPassword = (value) => {
  return value.length >= MIN_LENGTH_PASSWORD
    ? { isValid: true, message: null }
    : { isValid: false, message: "Password is too short." };
};

export const arePasswordsMatching = (password) => {
  return (repeatPass) => {
    return password === repeatPass
      ? { isValid: true, message: null }
      : { isValid: false, message: "Passwords do not match." };
  };
};

export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email)
    ? { isValid: true, message: null }
    : { isValid: false, message: "Enter a valid email." };
};
