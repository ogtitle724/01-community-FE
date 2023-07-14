export function blindPwd(pwd) {
  return [...pwd].map((ele) => "*").join("");
}
