const emailFormatValidation = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(email);
};

const passwordFormatValidation = (password: string) =>
  password.length < 6 || password.length > 24 ? false : true;

export const userUtilities = {
  emailFormatValidation,
  passwordFormatValidation,
};
