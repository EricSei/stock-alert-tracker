import React, { useState } from "react";
import { Button, Form, Container, Header, Checkbox } from "semantic-ui-react";
import Layout from "../../../components/Layout/Layout";
import Footer from "../../../components/Layout/Footer/Footer";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Google from "../Google";
import Facebook from "../Facebook";
import { authenticate, isAuth } from "../../auth/helpers";
import Wrapper from "../../../components/Layout/Wrapper";

const SignUpPage = () => {
  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Register",
  });

  const { name, email, password, buttonText } = values;

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
    setValues({ ...values, buttonText: "Registering" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("SIGNUP SUCCESS", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Registered",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error);
        setValues({ ...values, buttonText: "Register" });
        toast.error(error);
      });
  };

  const signupForm = () => (
    <Form>
      <Form.Input
        onChange={handleChange("name")}
        value={name}
        label="Name"
        placeholder="joe smith"
      />

      <Form.Input
        onChange={handleChange("email")}
        value={email}
        label="Email"
        placeholder="joe@schmoe.com"
      />
      <Form.Input
        onChange={handleChange("password")}
        value={password}
        label="password"
        type="password"
        placeholder="password"
      />
      <Form.Field>
        <Checkbox
          label="I agree to the Terms and Conditions. "
          defaultChecked={true}
        />
        <Link to="/terms"> Read More</Link>
      </Form.Field>

      <Button onClick={clickSubmit}>{buttonText}</Button>
    </Form>
  );

  return (
    <Layout>
      <Wrapper />
      <Container style={{ width: "50%" }}>
        <ToastContainer />
        {/* <Facebook informParent={informParent} /> */}
        <Header as="h2" textAlign="center">
          Accout | Register
          <Google
            informParent={informParent}
            label={"Easy Sign Up with Google"}
          />
        </Header>
        {signupForm()}
        <br style={{ margin: "2em" }} />
      </Container>
      <Wrapper />
      <Footer />
    </Layout>
  );
};

export default SignUpPage;
