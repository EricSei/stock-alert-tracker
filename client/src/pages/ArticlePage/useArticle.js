import { useEffect, useState, useContext } from "react";

import backend from "../../apis/backend";
import Wrapper from "../../components/Layout/Wrapper";
import AuthContext from "../../context/authContext";
import ArticleComponent from "./ArticleComponent";

const useArticle = () => {
  const [articles, setArticles] = useState(null);
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    await backend
      .get("/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteArticle = async (id) => {
    await backend
      .delete(`/articles/${id}/${isAuth()._id}`)
      .then((res) => {
        // console.log(res.data);
        getArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return [articles, setArticles, getArticles, deleteArticle];
};

export default useArticle;
