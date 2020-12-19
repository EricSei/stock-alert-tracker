import React, { useEffect, useState } from "react";
import {
  setCookie,
  removeCookie,
  getCookie,
  setLocalStorage,
  removeLocalStorage,
  updateUser,
  authenticate,
  isAuth,
  signout,
} from "./authHelper";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(isAuth());
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isAuth, updateUser, getCookie }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
