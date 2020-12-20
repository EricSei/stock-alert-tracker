import React, { useEffect, useState, useContext } from "react";
import { Header, Form, TextArea, Responsive } from "semantic-ui-react";

import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import DailyStock from "../../components/DailyStock/DailyStock";
import AuthContext from "../../context/authContext";

const ViewDailyStock = () => {
  const { isAuth } = useContext(AuthContext);

  const [dailyStocks, setDailyStocks] = useState(null);

  useEffect(() => {
    getDailyStocks();
  }, []);

  const getDailyStocks = async () => {
    await backend
      .get("/stocks")
      .then((res) => {
        // console.log(res.data);
        setDailyStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDailyStock = async (id) => {
    await backend
      .delete(`/stocks/${id}/${isAuth()._id}`)
      .then((res) => {
        // console.log(res.data);
        getDailyStocks();
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderDailyStock = (dailyStocks) => {
    if (dailyStocks != null && dailyStocks.length > 0) {
      return dailyStocks.map((i) => {
        return (
          <DailyStock
            id={i._id}
            date={i.date}
            key={i.title}
            title={i.title}
            ticker={i.ticker}
            author={i.author}
            buy={i.buy}
            sell={i.sell}
            deleteDailyStock={deleteDailyStock}
          />
        );
      });
    }
  };
  return (
    <Layout>
      <Responsive {...Responsive.onlyMobile}>
        <Header as="h2">{"Daily Stock"}</Header>
        {renderDailyStock(dailyStocks)}
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <Header as="h2">{"Daily Stock"}</Header>
          {renderDailyStock(dailyStocks)}
        </AdminBoard>
      </Responsive>
    </Layout>
  );
};

export default ViewDailyStock;
