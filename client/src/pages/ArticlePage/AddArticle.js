import React, { Fragment, useContext, useEffect, useState } from "react";
import { Header, Form, Button, TextArea, Responsive } from "semantic-ui-react";
import axios from "axios";
import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import DailyStock from "../../components/DailyStock/DailyStock";
import AuthContext from "../../context/authContext";
import useArticle from "./useArticle";

import { todayDate } from "../../utilities/date";

const AddArticle = () => {
  const { isAuth, getCookie } = useContext(AuthContext);
  const [articles, setArticles, getArticles, deleteArticle] = useArticle();

  let myDate = todayDate();
  const token = getCookie("token");

  const [payload, setPayload] = useState({
    title: "",
    description: "",
  });
  const { title, description } = payload;

  useEffect(() => {
    getArticles();
  }, []);

  // const getArticles = async () => {
  //   await backend
  //     .get("/articles")
  //     .then((res) => {
  //       setArticles(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const createArticle = (e) => {
    e.preventDefault();
    console.log("payload", payload);
    let { title, description } = payload;

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
        console.log(res.data);
        getArticles();
      })
      .catch((e) => console.log(e));
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
        />
      </Form.Field>

      <Button onClick={createArticle}>Submit</Button>
    </Form>
  );

  return (
    <Layout>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <Header as="h2">{"Add An Article"}</Header>
          {form()}
        </AdminBoard>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Fragment>
          <Header as="h2">{"Add An Article"}</Header>
          {form()}
        </Fragment>
      </Responsive>
    </Layout>
  );
};

export default AddArticle;
