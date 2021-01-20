import React from "react";
import { Grid } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper";
import RenderArticle from "./RenderArticles";

const ArticlePage = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid divided="vertically">
          <RenderArticle />
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default ArticlePage;
