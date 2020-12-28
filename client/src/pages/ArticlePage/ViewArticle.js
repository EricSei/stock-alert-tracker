import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import { Header } from "semantic-ui-react";
import Wrapper from "../../components/Layout/Wrapper";

const ViewArticle = () => {
  const { id, title, desc } = useHistory().location.state;
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");

  // useEffect(() => {
  //   getArticleById(id);
  // }, []);

  const getArticleById = async (id) => {
    await backend
      .get(`/articles/${id}`)
      .then((res) => {
        // const { title, desc } = res.data;
        // setTitle(title);
        // setDesc(desc);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <Wrapper>
        <Header>{title}</Header>
        <p>{desc}</p>
      </Wrapper>
    </Layout>
  );
};

export default ViewArticle;
