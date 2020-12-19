import { useContext } from "react";
import axios from "axios";
import { getCookie } from "../context/authHelper";

//call getCookie
const token = getCookie("token");
console.log(token);
export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
