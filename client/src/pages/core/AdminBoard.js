import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Grid, Segment, Dropdown } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper";

const AdminBoard = ({ children }) => {
  const [activeItem, setActiveItem] = useState("");
  const [color, setColor] = useState("");
  let history = useHistory();
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    setColor("teal");
  };

  return (
    <Layout>
      <Wrapper />
      <Grid>
        <Grid.Column width={3}>
          <Menu pointing vertical>
            <Menu.Item>
              Daily Stock
              <Menu.Menu color={color}>
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
            {/* <Menu.Item
              name="dailyupdate"
              active={activeItem === "dailyupdate"}
            /> */}
            <Menu.Item
              name="articles"
              active={activeItem === "articles"}
              onClick={handleItemClick}
            >
              Articles
              <Menu.Menu>
                <Menu.Item
                  as={Link}
                  to="/add/article"
                  name="add-article"
                  active={activeItem === "add-article"}
                  onClick={handleItemClick}
                >
                  Add
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/render/articles"
                  name="render-articles"
                  active={activeItem === "render-articles"}
                  onClick={handleItemClick}
                >
                  View
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item
              name="articles"
              active={activeItem === "articles"}
              onClick={handleItemClick}
            >
              Market Update
              <Menu.Menu>
                <Menu.Item
                  as={Link}
                  to="/add/market"
                  name="add-market"
                  active={activeItem === "add-market"}
                  onClick={handleItemClick}
                >
                  Add
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/render/markets"
                  name="render-markets"
                  active={activeItem === "render-markets"}
                  onClick={handleItemClick}
                >
                  View
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/admin"
              name="users"
              active={activeItem === "users"}
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
