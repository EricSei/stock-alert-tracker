import _ from "lodash";
import React, { Fragment, useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon, Image, Menu, Sidebar, Header } from "semantic-ui-react";

import LOGO from "../../assets/zfs-logo.jpg";

import AuthContext from "../../context/authContext";

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
}) => {
  const { isAuth } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("account");

  const handleItemClick = (e, { name }) => setActiveItem("name");

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        color="teal"
        vertical
        width="thick"
        visible={visible}
      >
        <Menu.Item>
          <Image size="tiny" src={LOGO} />
        </Menu.Item>
        <Menu.Item as={Link} to={"/"} content={"Home"} key={"Home"}>
          {/* <Icon name="home" size="mini" /> */}
          <Header as="h4">
            <Icon name="home" size="tiny" /> Home
          </Header>
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to={"/articles"}
          content={"Articles"}
          key={"articles"}
        >
          <Header as="h4"> Articles</Header>
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to={"/markets"}
          content={"Daily Update"}
          key={"daily-update"}
        >
          <Header as="h4">Daily Update</Header>
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to={"/services"}
          content={"Member Services"}
          key={"services"}
        >
          <Header as="h4">Member Services</Header>
        </Menu.Item>
        {isAuth() &&
          (isAuth().subscribes[0] == "dailystock" ||
            isAuth().role == "admin") && (
            <Fragment>
              <Menu.Item
                as={NavLink}
                to={"/daily-stock-pick"}
                content={"Daily-Stock-Pick"}
                key={"daily-stock-pick"}
              >
                <Header as="h4">Daily Stock Pick</Header>
              </Menu.Item>
            </Fragment>
          )}
        {isAuth() && isAuth().role == "subscriber" && (
          <Menu.Item>
            <Header as="h5">User DashBoard</Header>
            <Menu.Menu>
              <Menu.Item
                as={NavLink}
                to={"/subscriptions"}
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
            </Menu.Menu>
          </Menu.Item>
        )}

        {isAuth() && isAuth().role === "admin" && (
          <Menu.Item>
            <Header as="h4">AdminBoard</Header>
            <Menu.Menu>
              <Header as="h6"> Stock Pick </Header>
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
                Update
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        )}
        {!isAuth() && (
          <Fragment>
            <Menu.Item
              as={NavLink}
              to={"/signup"}
              content={"Sign Up"}
              key={"signup"}
            />
            <Menu.Item
              as={NavLink}
              to={"/login"}
              content={"Sign In"}
              key={"signin"}
            />
          </Fragment>
        )}
        {isAuth() && (
          <Fragment>
            <Menu.Item
              as={NavLink}
              to={"/private"}
              content={"User Profile"}
              key={"private"}
            >
              <Header as="h4">
                <Icon name="user circle" size="tiny" />
                User Profile
              </Header>
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to={"/signout"}
              content={"Sign Out"}
              key={"signout"}
            />
          </Fragment>
        )}
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top" color="teal" inverted>
          <Menu.Item>
            <Image size="mini" src={LOGO} />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default NavBarMobile;
