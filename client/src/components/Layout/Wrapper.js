import React from "react";
import { Container } from "semantic-ui-react";

const Wrapper = ({ children }) => (
  // style={{ marginTop: "15em" }} add some styles
  <Container style={{ marginTop: "10em" }}>{children}</Container>
);

export default Wrapper;
