const validateUsername = (username) => {
  const usernameRegex = /^(?=.*[A-Z])[a-zA-Z0-9_]{6,}$/;
  return usernameRegex.test(username);
};

export default validateUsername;
