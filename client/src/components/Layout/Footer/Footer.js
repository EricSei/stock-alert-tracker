import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as={Link} to={"/terms"}>
                  About
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.facebook.com/Zaw-Financial-Solutions-109955530749240"
                  target="_blank"
                >
                  Contact Us
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as={Link} to={"/services"}>
                  Stock Recommendations
                </List.Item>
                <List.Item as={Link} to={"/markets"}>
                  Market Update
                </List.Item>
                <List.Item as={Link} to={"/articles"}>
                  Articles
                </List.Item>
                <List.Item as={Link} to={"/terms"}>
                  {" "}
                  FAQ{" "}
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" inverted>
                Follow Us
              </Header>
              <List.Item
                as="a"
                href="https://www.facebook.com/Zaw-Financial-Solutions-109955530749240"
                target="_blank"
              >
                <Icon name="facebook" size="large" circular color="teal" />
              </List.Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <List.Item>
                Zaw Finance{" "}
                <Icon name="copyright" size="large" circular color="teal" />{" "}
                2021
              </List.Item>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
export default Footer;
