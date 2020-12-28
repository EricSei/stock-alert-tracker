import React from "react";
import { Button, Card, Header } from "semantic-ui-react";

const Subscription = ({
  subscriptionId,
  priceId,
  desc,
  handleCancelSubscription,
}) => {
  return (
    <Card>
      <Header>{desc}</Header>
      <p>Subscription Number: {subscriptionId}</p>
      <Button
        color="red"
        onClick={() => handleCancelSubscription(subscriptionId, desc)}
      >
        Cancel
      </Button>
    </Card>
  );
};

export default Subscription;
