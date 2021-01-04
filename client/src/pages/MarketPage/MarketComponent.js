import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Grid, Image, Icon } from "semantic-ui-react";
import backend from "../../apis/backend";
import AuthContext from "../../context/authContext";

const Market = ({ id, title, desc, deleteMarket }) => {
  const history = useHistory();
  const { isAuth } = useContext(AuthContext);

  const handleClick = (id) => {
    history.push(`/market/view/${id}`, { id, title, desc });
  };

  const handleDelete = () => {
    deleteMarket(id);
  };

  return (
    <Grid.Row>
      {/* <Grid.Column width={10}> */}
      <Header>{title}</Header>
      <p> {desc.slice(0, 200) + " ..."} </p>
      <Button color="teal" content="Read More" onClick={() => handleClick(id)}>
        <Icon name="book" />
        Read More
      </Button>
      {isAuth() && isAuth().role == "admin" ? (
        <Button color="red" inverted onClick={handleDelete}>
          Delete
        </Button>
      ) : null}
      {/* </Grid.Column> */}
    </Grid.Row>
  );
};

export default Market;
