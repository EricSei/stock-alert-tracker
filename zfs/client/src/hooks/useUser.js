import React, { useState, useEffect } from "react";
import axios from "axios";

import backend     from '../apis/backend';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default async () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  
  useEffect(() => {
    if (isAuth()) {
      //call backend and fill users with all info/setUser and setAuth
      // backend.get('/user/')
      //   .then(res => { setUser({ ...user, username: res.data.username }) })
      //   .catch(err => { setUser({ ...user, username: '' }) });
      loadProfile();
    }
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE", response);
        const { role, name, email,stripeCustomerId, subscribes, history  } = response.data;
        setUser({ role, name, email, stripeCustomerId, subscribes, history });
      })
      .catch((error) => {
        // console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };

}