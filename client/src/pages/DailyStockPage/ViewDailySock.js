import React, { useEffect, useState, useContext } from "react";
import { Header, Form, TextArea, Responsive } from "semantic-ui-react";
import axios from "axios";

import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import DailyStock from "./DailyStock";
import AuthContext from "../../context/authContext";
import Wrapper from "../../components/Layout/Wrapper";
import RenderDailyStock from "./RenderDailyStock";
import useStocks from "./useStocks";

const ViewDailyStock = () => {
  const { isAuth, getCookie } = useContext(AuthContext);

  const [
    dailyStocks,
    setDailyStocks,
    getDailyStocks,
    deleteDailyStock,
  ] = useStocks();
  const token = getCookie("token");

  useEffect(() => {
    getDailyStocks();
  }, []);

  // const getDailyStocks = async () => {
  //   axios({
  //     method: "GET",
  //     url: `${process.env.REACT_APP_API}/stocks/${isAuth()._id}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setDailyStocks(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const deleteDailyStock = async (id) => {
  //   await backend
  //     .delete(`/stocks/${id}/${isAuth()._id}`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       getDailyStocks();
  //       // history.push("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const renderDailyStock = (dailyStocks) => {
  //   if (dailyStocks != null && dailyStocks.length > 0) {
  //     return dailyStocks.map((i) => {
  //       return (
  //         <DailyStock
  //           id={i._id}
  //           date={i.date}
  //           key={i.title}
  //           title={i.title}
  //           name={i.name}
  //           ticker={i.ticker}
  //           author={i.author}
  //           buy={i.buy}
  //           sell={i.sell}
  //           deleteDailyStock={deleteDailyStock}
  //         />
  //       );
  //     });
  //   }
  // };
  return (
    <Layout>
      <Responsive {...Responsive.onlyMobile}>
        <Header as="h2">{"Daily Stock"}</Header>
        <RenderDailyStock />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <Header as="h2">{"Daily Stock"}</Header>
          <RenderDailyStock />
        </AdminBoard>
      </Responsive>
    </Layout>
  );
};

export default ViewDailyStock;
