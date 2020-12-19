import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import Article from "../../components/Article/Article";

const ArticlePage = () => {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    await backend
      .get("/articles")
      .then((res) => {
        console.log(res.data);
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderArticle = (articles) => {
    if (articles != null && articles.length > 0) {
      return articles.map((i) => {
        return (
          <Article
            id={i.id}
            key={i.title}
            title={i.title}
            desc={i.description}
            author={i.author}
          />
        );
      });
    }
  };
  return (
    <Layout>
      <Grid divided="vertically">{renderArticle(articles)}</Grid>
    </Layout>
  );
};

export default ArticlePage;
