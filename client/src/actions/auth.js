import axios from "axios";

export async function register(user) {
  return await axios.post(`${process.env.REACT_APP_API}/register`, user);
}

export async function login(user) {
  return await axios.post(`${process.env.REACT_APP_API}/login`, user);
}

export function updateUserInLocalStorage(user, next) {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
}
