import React, { Fragment, useContext, useEffect, useState } from "react";
import { Header, Form, Button, TextArea, Responsive } from "semantic-ui-react";
import axios from "axios";
import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import AdminBoard from "../core/AdminBoard";
import AuthContext from "../../context/authContext";
import useMarket from "./useMarket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { todayDate } from "../../utilities/date";

const AddMarket = () => {
  const { isAuth, getCookie } = useContext(AuthContext);
  const [markets, setMarkets, getMarkets, deleteMarket] = useMarket();

  let myDate = todayDate();
  const token = getCookie("token");

  const [payload, setPayload] = useState({
    title: "",
    description: "",
    buttonText: "Submit",
  });
  const { title, description, buttonText } = payload;

  useEffect(() => {
    getMarkets();
  }, []);

  const createMarket = (e) => {
    e.preventDefault();

    let { title, description } = payload;
    setPayload({ ...payload, buttonText: "Submitting..." });

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/markets/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: title,
        description: description,
      },
    })
      .then((response) => {
        setPayload({
          ...payload,
          title: "",
          description: "",
          buttonText: "Submited",
        });
        toast.success("New Market Created Successfully.");
        getMarkets();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleChange = (name) => (event) => {
    // console.log()
    setPayload({ ...payload, [name]: event.target.value });
  };

  const form = () => (
    <Form>
      <Form.Field>
        <label> Title</label>
        <input
          placeholder="Google Inc"
          onChange={handleChange("title")}
          value={title}
          type="text"
          className="form-control"
        />
      </Form.Field>
      <Form.Field>
        <label> Content</label>
        <TextArea
          placeholder="Google ..."
          onChange={handleChange("description")}
          type="text"
          value={description}
          style={{ minHeight: 200 }}
        />
      </Form.Field>
      <Button onClick={createMarket}>{buttonText}</Button>
    </Form>
  );

  return (
    <Layout>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <AdminBoard>
          <ToastContainer />
          <Header as="h2">{"Add An Market"}</Header>
          {form()}
        </AdminBoard>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Fragment>
          <ToastContainer />
          <Header as="h2">{"Add An Market"}</Header>
          {form()}
        </Fragment>
      </Responsive>
    </Layout>
  );
};

export default AddMarket;
