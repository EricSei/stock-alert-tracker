import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Grid, Segment, Dropdown } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";

const AdminBoard = ({ children }) => {
  const [activeItem, setActiveItem] = useState("");
  const [color, setColor] = useState("teal");
  let history = useHistory();
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Layout>
      <Grid>
        <Grid.Column width={3}>
          <Menu secondary vertical color={color}>
            <Menu.Item>
              Daily Stock
              <Menu.Menu>
                <Menu.Item
                  as={Link}
                  to="/add/dailystock"
                  name="add-dailystock"
                  active={activeItem === "add-dailystock"}
                  onClick={handleItemClick}
                >
                  Add
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/view/dailystock"
                  name="view-stock"
                  active={activeItem === "view-stock"}
                  onClick={handleItemClick}
                >
                  View
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item
              name="dailyupdate"
              active={activeItem === "dailyupdate"}
            />
            <Menu.Item
              name="articles"
              active={activeItem === "articles"}
              onClick={handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/admin"
              name="users"
              active={activeItem === "users"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="settings"
              active={activeItem === "settings"}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={10}>{children}</Grid.Column>
      </Grid>
    </Layout>
  );
};

export default AdminBoard;
