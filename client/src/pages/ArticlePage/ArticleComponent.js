import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Grid, Image, Icon } from "semantic-ui-react";
import backend from "../../apis/backend";
import AuthContext from "../../context/authContext";

const Article = ({ id, title, desc, deleteArticle }) => {
  const history = useHistory();
  const { isAuth } = useContext(AuthContext);

  const handleClick = (id) => {
    history.push(`/article/view/${id}`, { id, title, desc });
  };

  const handleDelete = () => {
    deleteArticle(id);
  };

  return (
    <Grid.Row>
      {/* <Grid.Column width={10}> */}
      <Header>{title}</Header>
      <p> {desc.slice(0, 500) + " ..."} </p>
      <Button color="red" content="Read More" onClick={() => handleClick(id)}>
        <Icon name="paper plane" />
        Read More
      </Button>
      {isAuth() && isAuth().role == "admin" ? (
        <Button onClick={handleDelete}>Delete</Button>
      ) : null}
      {/* </Grid.Column> */}
    </Grid.Row>
  );
};

export default Article;
