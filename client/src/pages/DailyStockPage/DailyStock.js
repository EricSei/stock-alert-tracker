import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Header, Label, Icon, Button } from "semantic-ui-react";
import { Card, Item } from "semantic-ui-react";
import AuthContext from "../../context/authContext";

//get user //if admin display button

const DailyStock = ({
  id,
  name,
  ticker,
  buy,
  sell,
  description,
  date,
  deleteDailyStock,
}) => {
  const { isAuth } = useContext(AuthContext);
  const handleDelete = () => {
    deleteDailyStock(id);
    // console.log(id);
  };
  return (
    <Card color="red" className="card-customized">
      <Item.Content>
        <Label>
          <Icon
            name="calendar times outline red large inverted"
            className="calendar-times"
          />
          {date}
        </Label>
        <Header>
          Company:
          {name}
        </Header>
        <Header>
          <Icon name="industry" color="teal" />
          {ticker}
        </Header>
        <Header> Buy: {buy} </Header>
        <Header> Sell: {sell} </Header>
        <Header> Note: {description} </Header>

        {isAuth().role == "admin" ? (
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        ) : null}
      </Item.Content>
    </Card>
  );
};

export default DailyStock;
