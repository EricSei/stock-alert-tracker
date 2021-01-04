import React, { useEffect, useState, useContext } from "react";
import { Header, Form, TextArea, Responsive } from "semantic-ui-react";

import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import AuthContext from "../../context/authContext";
import Wrapper from "../../components/Layout/Wrapper";
import RenderMarkets from "./RenderMarkets";

const AdminViewMarkets = () => {
  return (
    <Layout>
      <Responsive {...Responsive.onlyMobile}>
        <Header as="h2">{"Market Update"}</Header>
        <RenderMarkets />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <Header as="h2">{"Market Update"}</Header>
          <RenderMarkets />
        </AdminBoard>
      </Responsive>
    </Layout>
  );
};

export default AdminViewMarkets;
