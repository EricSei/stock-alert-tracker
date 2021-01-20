import React from "react";
import { Card } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper";
import RenderDailyStock from "./RenderDailyStock";

const DailyStockPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Card.Group style={{ color: "red" }}>
          <RenderDailyStock />
        </Card.Group>
      </Wrapper>
    </Layout>
  );
};

export default DailyStockPage;
