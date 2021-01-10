import React, { useState, useContext, useEffect } from "react";
import Wrapper from "../../components/Layout/Wrapper";

import { Card } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";

import ServiceCard from "./ServiceCard";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/authContext";
import _services from "./services";

// console.log(process.env.REACT_APP_BASIC);

const Services = () => {
  let services = _services();
  let history = useHistory();

  const [productSelected, setProductSelected] = useState(null);
  const [butLabel, setButLabel] = useState("Subscribe");
  const { isAuth } = useContext(AuthContext);
  const [subscribes, setSubscribes] = useState([]);

  //check if custermer exist, or create one
  //need customerId, get it from user
  // let stripeCustomerId = user.stripeCustomerId;
  useEffect(() => {
    if (isAuth()) {
      console.log("User Exist");
      // console.log(isAuth().subscribes);
      setSubscribes(isAuth().subscribes);
    }
    // getStripeCustomer(stripeCustomerId);
    // console.log(customer)
    if (productSelected) {
      for (let subscribe of subscribes) {
        if (productSelected.name === subscribe) {
          setButLabel("Subscribed");
          alert("You already subscribed this service.");
          return;
        }
      }
      history.push("/prices", { productSelected });
    }
  }, [productSelected]);

  const handleSubscription = (key, priceId) => {
    if (services[key] === subscribes[0]) {
      setButLabel("Subscribed");
      alert("You already Subscribed this item.");
      return;
    }
    //register stripe and paymoney
    console.log("Handle Subscription.. ");
    console.log("services[key]", services[key]);
    setButLabel("Subscribing...");
    setProductSelected(services[key]);
    //user experience
  };

  const renderServices = (services) => {
    return services.map((service, index) => {
      return (
        <ServiceCard
          key={index}
          service={service}
          butLabel={butLabel}
          handleSubscription={handleSubscription}
        />
      );
    });
  };
  return (
    <Layout>
      <Wrapper style={{ marginTop: "10em" }}>
        <Card.Group>{renderServices(services)}</Card.Group>
      </Wrapper>
    </Layout>
  );
};

export default Services;
