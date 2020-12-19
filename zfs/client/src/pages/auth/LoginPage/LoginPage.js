import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Form, Header, Container } from "semantic-ui-react";
import axios from "axios";
// import { authenticate, isAuth } from "../helpers";
import { ToastContainer, toast } from "react-toastify";
import Google from "../Google";
import Facebook from "../Facebook";
import "react-toastify/dist/ReactToastify.min.css";

import Layout from "../../../components/Layout/Layout";

import {
  authenticate,
  isAuth,
  getCookie,
  signout,
  updateUser,
} from "../../auth/helpers";
import UserContext from "../../../context/userContext";
import Wrapper from "../../../components/Layout/Wrapper";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Sign In",
  });

  const { email, password, buttonText } = values;
  const token = getCookie("token");

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/private");
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);
        // save the response (user, token) localstorage/cookie
        authenticate(response, () => {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/private");
        });
      })
      .catch((error) => {
        // console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        // toast.error(error.response.data.error);
      });
  };

  const loginForm = () => (
    <Form>
      <Form.Field>
        <label>Email</label>
        <input
          placeholder="janedoe@gmail.com"
          onChange={handleChange("email")}
          value={email}
          type="email"
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          placeholder="password"
          onChange={handleChange("password")}
          value={password}
          type="password"
        />
      </Form.Field>

      <Button type="submit" onClick={clickSubmit}>
        {buttonText}
      </Button>
    </Form>
  );

  return (
    <Layout>
      <Wrapper>
        <Container style={{ width: "50%" }}>
          <ToastContainer />
          {isAuth() ? <Redirect to="/" /> : null}
          <Header textAlign="center" as="h2">
            Account | Sign In
          </Header>
          {loginForm()}
          <br />
          <Link
            to="/auth/password/forgot"
            className="btn btn-sm btn-outline-danger"
          >
            Forgot Password
          </Link>
          <br />
          <Google informParent={informParent} />
          <Facebook informParent={informParent} />
        </Container>
      </Wrapper>
    </Layout>
  );
};

export default Login;
