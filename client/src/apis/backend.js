import { useContext } from "react";
import axios from "axios";
import { getCookie } from "../context/authHelper";

//call getCookie
const token = getCookie("token");

export default axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
