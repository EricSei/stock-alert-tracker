import React, { Fragment, useContext, useEffect, useState } from "react";
import { Header, Form, Button, TextArea, Responsive } from "semantic-ui-react";
import axios from "axios";
import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import DailyStock from "../../components/DailyStock/DailyStock";
import AuthContext from "../../context/authContext";

import { todayDate } from "../../utilities/date";

const AddDailyStock = () => {
  const { isAuth, getCookie } = useContext(AuthContext);
  let myDate = todayDate();
  // console.log(isAuth());
  const [dailyStocks, setDailyStocks] = useState(null);
  const token = getCookie("token");

  const [payload, setPayload] = useState({
    name: "",
    description: "",
    ticker: "",
    buy: "",
    sell: "",
    date: `${myDate}`,
  });
  const { name, description, ticker, buy, sell, date } = payload;

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

  const createDailyStock = (e) => {
    e.preventDefault();
    console.log("payload", payload);
    let { name, description, ticker, buy, sell, date } = payload;

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/stock/create/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
        description: description,
        ticker: ticker,
        buy: buy,
        sell: sell,
        date: date,
      },
    })
      .then((res) => {
        console.log(res.data);
        getDailyStocks();
      })
      .catch((e) => console.log(e));
  };

  const updateDailyStock = async () => {};

  const deleteDailyStock = async () => {};

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    // console.log()
    setPayload({ ...payload, [name]: event.target.value });
  };

  const form = () => (
    <Form>
      <Form.Field>
        <label> Company Name</label>
        <input
          placeholder="eg. Google Inc"
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </Form.Field>

      <Form.Field>
        <label>Ticker/Symbol</label>
        <input
          placeholder="eg. google"
          onChange={handleChange("ticker")}
          value={ticker}
        />
      </Form.Field>
      <Form.Field>
        <label>Buy</label>
        <input placeholder="99.00" onChange={handleChange("buy")} value={buy} />
      </Form.Field>
      <Form.Field>
        <label>Sell</label>
        <input
          placeholder="100.20"
          onChange={handleChange("sell")}
          value={sell}
        />
      </Form.Field>
      <Form.Field>
        <label>Date</label>
        <input
          placeholder={"date"}
          onChange={handleChange("date")}
          value={date}
        />
      </Form.Field>
      <Form.Field>
        <label>Note</label>

        <TextArea
          placeholder="description..."
          onChange={handleChange("description")}
          value={description}
        />
      </Form.Field>
      <Button onClick={createDailyStock}>Submit</Button>
    </Form>
  );

  const renderDailyStock = (dailyStocks) => {
    if (dailyStocks != null && dailyStocks.length > 0) {
      return dailyStocks.map((i) => {
        return (
          <DailyStock
            id={i.id}
            date={i.date}
            key={i.title}
            title={i.title}
            ticker={i.ticker}
            author={i.author}
            buy={i.buy}
            sell={i.sell}
            description={i.description}
          />
        );
      });
    }
  };
  return (
    <Layout>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <Header as="h2">{"Add Daily Stock"}</Header>
          {form()}
        </AdminBoard>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Fragment>
          <Header as="h2">{"Add Daily Stock"}</Header>
          {form()}
        </Fragment>
      </Responsive>
    </Layout>
  );
};

export default AddDailyStock;
