import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, Item } from "semantic-ui-react";
import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import DailyStock from "../../components/DailyStock/DailyStock";
import AuthContext from "../../context/authContext";
import { useHistory } from "react-router-dom";
import Wrapper from "../../components/Layout/Wrapper";

const DailyStockPage = () => {
  const [dailyStocks, setDailyStocks] = useState(null);
  const { isAuth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getDailyStocks();
  }, []);

  const getDailyStocks = async () => {
    await backend
      .get("/stocks/")
      .then((res) => {
        console.log(res.data);
        setDailyStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deleteDailyStock = (id) => {
  //   console.log(id);
  // };

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
      <Wrapper>
        <Card.Group style={{ color: "red" }}>
          {renderDailyStock(dailyStocks)}
        </Card.Group>
      </Wrapper>
    </Layout>
  );
};

export default DailyStockPage;
