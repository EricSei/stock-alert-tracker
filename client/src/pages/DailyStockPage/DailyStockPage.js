import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, Item } from "semantic-ui-react";
import axios from "axios";

import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import DailyStock from "../../components/DailyStock/DailyStock";
import AuthContext from "../../context/authContext";
import { useHistory } from "react-router-dom";
import Wrapper from "../../components/Layout/Wrapper";

const DailyStockPage = () => {
  const [dailyStocks, setDailyStocks] = useState(null);
  const { isAuth, getCookie } = useContext(AuthContext);
  const history = useHistory();
  const token = getCookie("token");

  useEffect(() => {
    getDailyStocks();
  }, []);

  const getDailyStocks = async () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/stocks/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
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
            description={i.description}
            deleteDailyStock={deleteDailyStock}
          />
        );
      });
    }
  };
  return (
    <Layout>
      <Wrapper>
        <Card.Group style={{ color: "red" }}>
          {renderDailyStock(dailyStocks)}
        </Card.Group>
      </Wrapper>
    </Layout>
  );
};

export default DailyStockPage;
