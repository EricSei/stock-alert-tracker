import React, { Fragment, useContext, useEffect, useState } from "react";
import { Header, Form, Button, TextArea, Responsive } from "semantic-ui-react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import DailyStock from "./DailyStock";
import AuthContext from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";

import { todayDate } from "../../utilities/date";
import useStocks from "./useStocks";

const AddDailyStock = () => {
  const { isAuth, getCookie } = useContext(AuthContext);
  const [
    dailyStocks,
    setDailyStocks,
    getDailyStocks,
    deleteDailyStock,
  ] = useStocks();
  let myDate = todayDate();
  const token = getCookie("token");

  const [payload, setPayload] = useState({
    name: "",
    description: "",
    ticker: "",
    buy: "",
    sell: "",
    buttonText: "Submit",
    date: `${myDate}`,
  });
  const { name, description, ticker, buy, sell, buttonText, date } = payload;

  useEffect(() => {
    getDailyStocks();
  }, []);

  const createDailyStock = (e) => {
    e.preventDefault();
    // console.log("payload", payload);
    let { name, description, ticker, buy, sell, date } = payload;
    setPayload({ ...payload, buttonText: "Submitting..." });
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
        // console.log(res.data);
        setPayload({
          ...payload,
          name: "",
          description: "",
          ticker: "",
          buy: "",
          sell: "",
          buttonText: "Submited",
        });
        toast.success("New Stock Pick Created Successfully.");
        getDailyStocks();
      })
      .catch((e) => {
        toast.error("Error Occurred.");
        console.log(e);
      });
  };

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

  return (
    <Layout>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <ToastContainer />
          <Header as="h2">{"Add Daily Stock"}</Header>
          {form()}
        </AdminBoard>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Fragment>
          <ToastContainer />
          <Header as="h2">{"Add Daily Stock"}</Header>
          {form()}
        </Fragment>
      </Responsive>
    </Layout>
  );
};

export default AddDailyStock;
