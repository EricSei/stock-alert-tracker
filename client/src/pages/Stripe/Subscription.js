import React from "react";
import { Button, Card, Header } from "semantic-ui-react";

const Subscription = ({
  subscriptionId,
  priceId,
  desc,
  selectedProductName,
  handleCancelSubscription,
}) => {
  return (
    <Card>
      <Header>{desc}</Header>
      <Header>Product Name:</Header>
      <p>{selectedProductName}</p>
      <Header>Subscription Number:</Header>
      <p> {subscriptionId}</p>
      <Button
        color="red"
        onClick={() =>
          handleCancelSubscription(subscriptionId, selectedProductName)
        }
      >
        Cancel
      </Button>
    </Card>
  );
};

export default Subscription;
