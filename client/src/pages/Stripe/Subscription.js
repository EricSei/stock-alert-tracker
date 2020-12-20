import React from "react";
import { Button, Card } from "semantic-ui-react";

const Subscription = ({
  subscriptionId,
  priceId,
  desc,
  handleCancelSubscription,
}) => {
  return (
    <Card>
      <p>SubscriptionId: {subscriptionId}</p>
      <p>priceId: {priceId}</p>
      <p>{desc}</p>
      <Button onClick={() => handleCancelSubscription(subscriptionId, desc)}>
        Cancel
      </Button>
    </Card>
  );
};

export default Subscription;
