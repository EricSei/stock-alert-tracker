import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../context/userContext";

import "react-toastify/dist/ReactToastify.min.css";
import { Header } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";

const Private = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  //call useUser which filled with userProfile
  //todo : set userContext Here for stripeId etc

  const [values, setValues] = useState({
    role: "",
    name: "",
    phoneNumber: "+1",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
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
        // console.log("PRIVATE PROFILE UPDATE", response);
        let {
          role,
          name,
          email,
          subscribes,
          stripeCustomerId,
          phoneNumber,
          history,
        } = response.data;
        if (phoneNumber.length <= 2) {
          phoneNumber = "+1";
        }
        setValues({ ...values, role, name, phoneNumber, email });
        setUser({
          role,
          name,
          email,
          phoneNumber,
          subscribes,
          stripeCustomerId,
          history,
        });
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

  const { role, name, phoneNumber, email, password, buttonText } = values;

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
      data: { name, phoneNumber, password },
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
        <label className="text-muted">Phone Number</label>
        <input
          placeholder="+1"
          onChange={handleChange("phoneNumber")}
          value={phoneNumber}
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
      <div>
        {/* <ToastContainer /> */}
        <Header as="h2">Profile Update</Header>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
