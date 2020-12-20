import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Grid, Image, Icon } from "semantic-ui-react";
import backend from "../../apis/backend";

const Article = ({ id, title, desc }) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/article/view/${id}`, { id, title, desc });
  };

  return (
    <Grid.Row>
      Articles
      <Grid.Column width={10}>
        <Header>{title}</Header>
        <p> {desc} </p>
        <Button color="red" content="Read More" onClick={() => handleClick(id)}>
          <Icon name="paper plane" />
          Read More
        </Button>
      </Grid.Column>
      <Grid.Column width={4}>
        <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </Grid.Column>
    </Grid.Row>
  );
};

export default Article;
