import axios from "axios";
import { useEffect, useState, useContext } from "react";

import backend from "../../apis/backend";
import Wrapper from "../../components/Layout/Wrapper";
import AuthContext from "../../context/authContext";
import ArticleComponent from "./ArticleComponent";

const useArticle = () => {
  const [articles, setArticles] = useState(null);
  const { isAuth, getCookie } = useContext(AuthContext);

  useEffect(() => {
    getArticles();
  }, []);

  // const getArticles = async () => {
  //   await backend
  //     .get("/articles")
  //     .then((res) => {
  //       // console.log(res.data);
  //       setArticles(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getArticles = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API}/articles`,
    })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteArticle = async (id) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/articles/${id}/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        getArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArticleById = async (id) => {
    await axios
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

  return [articles, setArticles, getArticles, deleteArticle];
  // return {articles, setArticles, getArticles, deleteArticle};
};

export default useArticle;
