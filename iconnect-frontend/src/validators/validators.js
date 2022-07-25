export const stringFieldValidation = (value) => {
  if (value === null || value === "") {
    return false;
  }
  return true;
};

export const emailValidation = (email) => {
  const regularExpression =
  /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  return regularExpression.test(email);
};
