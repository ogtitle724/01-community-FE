export const checkEmail = (eMail) => {
  const pattern = /^[0-9a-zA-Z_\.-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+){1,2}$/i;

  if (pattern.test(eMail)) return true;
  else return false;
};

export const checkPwd = (pwd) => {
  const pattern = /^(?!.*\s)(?=.*[A-Za-z])(?=.*[0-9]).{8,16}$/;

  if (pattern.test(pwd)) return true;
  else return false;
};

export const isMatch = (pwdA, pwdB) => {
  if (pwdA === pwdB) return true;
  else return false;
};
