import React, { Fragment, useContext, useEffect, useState } from "react";
import { Header, Form, Button, TextArea, Responsive } from "semantic-ui-react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import AuthContext from "../../context/authContext";
import useArticle from "./useArticle";
import { ToastContainer, toast } from "react-toastify";

import { todayDate } from "../../utilities/date";

const AddArticle = () => {
  const { isAuth, getCookie } = useContext(AuthContext);
  const [articles, setArticles, getArticles, deleteArticle] = useArticle();

  let myDate = todayDate();
  const token = getCookie("token");

  const [payload, setPayload] = useState({
    title: "",
    description: "",
    buttonText: "Submit",
  });
  const { title, description, buttonText } = payload;

  useEffect(() => {
    getArticles();
  }, []);

  const createArticle = (e) => {
    e.preventDefault();
    console.log("payload", payload);
    let { title, description } = payload;
    setPayload({
      ...payload,
      buttonText: "Submited",
    });

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/articles/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: title,
        description: description,
      },
    })
      .then((res) => {
        setPayload({
          ...payload,
          title: "",
          description: "",
        });
        toast.success("A New Article Created Successfully.");
      })
      .catch((e) => {
        toast.error("Error Occured.");
        getArticles();
      });
  };

  const handleChange = (name) => (event) => {
    // console.log()
    setPayload({ ...payload, [name]: event.target.value });
  };

  const form = () => (
    <Form>
      <Form.Field>
        <label> Title</label>
        <input
          placeholder="Google Inc"
          onChange={handleChange("title")}
          value={title}
          type="text"
          className="form-control"
        />
      </Form.Field>
      <Form.Field>
        <label> Content</label>
        <TextArea
          placeholder="google ..."
          onChange={handleChange("description")}
          type="text"
          value={description}
          style={{ minHeight: 400 }}
        />
      </Form.Field>

      <Button onClick={createArticle}>Submit</Button>
    </Form>
  );

  return (
    <Layout>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <ToastContainer />
          <Header as="h2">{"Add An Article"}</Header>
          {form()}
        </AdminBoard>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <ToastContainer />

        <Fragment>
          <Header as="h2">{"Add An Article"}</Header>
          {form()}
        </Fragment>
      </Responsive>
    </Layout>
  );
};

export default AddArticle;
