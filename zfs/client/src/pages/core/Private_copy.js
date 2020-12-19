import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import useUser from "../../hooks/useUser";

const Private = ({ history }) => {
  //call useUser which filled with userProfile
  //todo : set userContext Here for stripeId etc
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    useUser();
  }, []);

  const { role, name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE SUCCESS", response);
        updateUser(response, () => {
          setValues({ ...values, buttonText: "Submitted" });
          toast.success("Profile updated successfully");
        });
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Role</label>
        <input
          defaultValue={role}
          type="text"
          className="form-control"
          disabled
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          defaultValue={email}
          type="email"
          className="form-control"
          disabled
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="pt-5 text-center">Private</h1>
        <p className="lead text-center">Profile update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
