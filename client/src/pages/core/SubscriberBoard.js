import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";

import Layout from "../../components/Layout/Layout";

const users = [{ name: "Eric", email: "eric@gmail.com", role: "subscriber" }];

const SubscriberBoard = () => {
  const [activeItem, setActiveItem] = useState("account");

  const handleItemClick = (e, { name }) => setActiveItem("name");
  return (
    <Layout>
      <Menu>
        <Menu.Item
          as={NavLink}
          to={"/account"}
          name="subscriptions"
          active={activeItem === "subscriptions"}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to={"/subscriberboard"}
          name="settings"
          active={activeItem === "settings"}
          onClick={handleItemClick}
        />
      </Menu>
    </Layout>
  );
};

export default SubscriberBoard;
