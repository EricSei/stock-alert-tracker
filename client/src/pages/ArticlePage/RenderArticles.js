import React, { useEffect, useState, useContext } from "react";
import ArticleComponent from "./ArticleComponent";
import useArticle from "./useArticle";

const RenderArticle = () => {
  const [articles, setArticles, getArticles, deleteArticle] = useArticle();

  const renderArticles = (articles) => {
    if (articles != null && articles.length > 0) {
      return articles.map((i) => {
        return (
          <ArticleComponent
            id={i._id}
            key={i.title}
            title={i.title}
            desc={i.description}
            author={i.author}
            deleteArticle={deleteArticle}
          />
        );
      });
    }
  };
  return <>{renderArticles(articles)}</>;
};

export default RenderArticle;
