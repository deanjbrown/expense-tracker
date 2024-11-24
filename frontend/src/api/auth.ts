import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/api/account",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = (data) => API.post("/login", data);
export const logout = () => API.post("/logout");
export const register = (data) => API.post("/register", {"mode":"register", ...data});
export const userDetail = () => API.get("/userDetail");
export const verifyEmail = (data) => API.post("/verifyEmail", data);

// TODO => We need to move our frontend validation out of the forms and then import it here and there so that we can verify it.....
