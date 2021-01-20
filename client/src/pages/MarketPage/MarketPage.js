import React from "react";
import { Grid } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper";
import RenderMarkets from "./RenderMarkets";

const MarketPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid divided="vertically">
          <RenderMarkets />
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default MarketPage;
