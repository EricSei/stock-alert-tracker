import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Header, Label, Icon, Button } from "semantic-ui-react";
import { Card, Item } from "semantic-ui-react";
import AuthContext from "../../context/authContext";
import "./DailyStock.scss";

//get user //if admin display button

const DailyStock = ({
  id,
  title,
  ticker,
  buy,
  sell,
  date,
  deleteDailyStock,
}) => {
  //
  const handleDelete = () => {
    deleteDailyStock(id);
    // console.log(id);
  };
  const { isAuth } = useContext(AuthContext);
  return (
    <Card color="red" className="card-customized">
      <Item.Content>
        <Label>
          <Icon
            name="calendar times outline red large inverted"
            className="calendar-times"
          />
          {date}
          {title}
        </Label>
        <Header>
          <Icon name={ticker} />
          {ticker}
        </Header>
        <Header> Buy: {buy} </Header>
        <Header> Sell: {sell} </Header>
        <Header> Note: {sell} </Header>

        {isAuth().role == "admin" ? (
          <Button onClick={handleDelete}>Delete</Button>
        ) : null}
      </Item.Content>
    </Card>
  );
};

export default DailyStock;
