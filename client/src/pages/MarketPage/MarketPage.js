import React, { useEffect, useState, useContext } from "react";
import { Grid } from "semantic-ui-react";

import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper";
import AuthContext from "../../context/authContext";
import RenderMarkets from "./RenderMarkets";
import useMarket from "./useMarket";

const MarketPage = () => {
  const [markets, setMarkets, getMarkets, deleteMarket] = useMarket();

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
