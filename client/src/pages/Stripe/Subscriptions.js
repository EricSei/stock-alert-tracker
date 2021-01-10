import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
import PriceChangeForm from "./PriceChangeForm";
import Layout from "../../components/Layout/Layout";
import StripeContext from "../../context/StripeContext";
import AuthContext from "../../context/authContext";
import backend from "../../apis/backend";
import Subscription from "./Subscription";
import Wrapper from "../../components/Layout/Wrapper";

//replace accountinfo with customer
function Subscriptions() {
  const { isAuth, updateUser, getCookie } = useContext(AuthContext);
  const token = getCookie("token");

  const { accountInformation } = useContext(StripeContext);
  const { customer, setCustomer } = useContext(StripeContext);

  let [customerPaymentMethod, setCustomerPaymentmethod] = useState(null);
  let [subscriptionCancelled, setSubscriptionCancelled] = useState(false);
  let [selectedProduct, setSelectedProduct] = useState(
    accountInformation["priceId"]
  );
  let [selectedProductName] = useState(accountInformation["priceId"]);
  let [subscriptions, setSubscriptions] = useState(null);

  useEffect(() => {
    //call and set subscriptions
    getStripeCustomer(isAuth().stripeCustomerId);
  }, [subscriptionCancelled]);

  //get customer and setSusbscriptions
  const getStripeCustomer = (customerId) => {
    // evt.preventDefault();
    backend
      .post("/get-customer", {
        customerId: customerId,
      })
      .then((result) => {
        // console.log("this is customer data", result.data);
        setCustomer(result.data.customer);
        setSubscriptions(result.data.customer.subscriptions["data"]);
        console.log(result.data.customer.subscriptions["data"]);
        // setStripeCustomerId(result.data.customer.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderSubscribes = (subscriptions) => {
    if (Array.isArray(subscriptions) && subscriptions.length > 0) {
      return subscriptions.map((subscription) => {
        return (
          <Subscription
            subscriptionId={subscription.id}
            priceId={subscription.plan["id"]}
            selectedProductName={selectedProductName}
            desc={subscription.plan["metadata"]["description"]}
            handleCancelSubscription={cancelSubscription}
          />
        );
      });
    }
  };

  //subscribe comes from productedSelcted
  //@content at local backend
  const handleUnSubscribe = (selectedProductName) => {
    console.log("unSubscribe", selectedProductName);

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/deleteSubscribe`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id: isAuth()._id, unSubscribe: selectedProductName },
    })
      .then((result) => {
        console.log("result", result);
        updateUser(result, () => console.log("user updated with subscribed."));
      })
      .catch((error) => console.log(error));
  };

  //@ stripe
  function cancelSubscription(subscriptionId, selectedProductName) {
    console.log(accountInformation.subscription);
    console.log(selectedProductName);
    handleUnSubscribe(selectedProductName);

    fetch(`${process.env.REACT_APP_API}/cancel-subscription`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // subscriptionId: accountInformation.subscription.id,
        subscriptionId: subscriptionId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((cancelSubscriptionResponse) => {
        //unsubscribe here
        setSubscriptionCancelled(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <Wrapper>
        <h2>Subscriptions</h2>
        {subscriptions && subscriptions.length > 0 ? (
          renderSubscribes(subscriptions)
        ) : (
          <div>You have no subscriptions. Subscribe today. </div>
        )}
      </Wrapper>
    </Layout>
  );
}

export default withRouter(Subscriptions);
