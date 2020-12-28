import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Grid, Image, Icon } from "semantic-ui-react";
import backend from "../../apis/backend";

const Article = ({ id, title, desc }) => {
  const history = useHistory();

  const handleClick = (id) => {
    getShortDesc(desc);
    history.push(`/article/view/${id}`, { id, title, desc });
  };

  const getShortDesc = (desc) => {};

  return (
    <Grid.Row>
      Articles
      <Grid.Column width={10}>
        <Header>{title}</Header>
        <p> {desc.slice(0, 1)} </p>
        <Button color="red" content="Read More" onClick={() => handleClick(id)}>
          <Icon name="paper plane" />
          Read More
        </Button>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Article;
