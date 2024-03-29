import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Header, Label, Icon } from "semantic-ui-react";
import { Container, Grid, Image, Card } from "semantic-ui-react";

const ServiceCard = ({ service, handleSubscription, butLabel, priceId }) => {
  return (
    <Card color="red" className="card">
      <Card.Content>
        <Card.Header>
          <Label color="red">Best Price</Label>
          {service.title}
        </Card.Header>
        <Card.Meta>
          <span className="date"> Popular Services </span>
        </Card.Meta>
        <Card.Description>{service.description}</Card.Description>
        <br />
        <Label color="green">$ {service.fees}</Label>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="teal"
            onClick={() => handleSubscription(service.key, priceId)}
          >
            {butLabel}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ServiceCard;
