const emailFormatValidation = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(email);
};

const passwordFormatValidation = (password: string) =>
  password.length < 6 || password.length > 24 ? false : true;

const JSONValidation = (reqBody: string[]): boolean => {
  if (
    (reqBody.length === 2 &&
      reqBody.includes('email') &&
      reqBody.includes('password')) ||
    (reqBody.length === 4 &&
      reqBody.includes('username') &&
      reqBody.includes('email') &&
      reqBody.includes('password') &&
      reqBody.includes('repeatPassword'))
  ) {
    return true;
  }

  return false;
};

export const userUtilities = {
  JSONValidation,
  emailFormatValidation,
  passwordFormatValidation,
};
