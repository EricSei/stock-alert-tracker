import _ from "lodash";
import React, { Fragment, useContext } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Image, Menu, Sidebar, Responsive } from "semantic-ui-react";
import LOGO from "../../assets/zfs-logo.jpg";

//use authContext
// import { authenticate, isAuth } from "../../pages/auth/helpers";
import AuthContext from "../../context/authContext";

const NavBarDesktop = () => {
  // create userContext
  const { isAuth } = useContext(AuthContext);

  return (
    <Menu fixed="top" color="teal" sticky inverted>
      <Menu.Item>
        <Image size="tiny" src={LOGO} as={Link} to={"/"} />
      </Menu.Item>
      <Menu.Item as={NavLink} to={"/"} content={"Home"} key={"home"} />
      <Menu.Item
        as={NavLink}
        to={"/articles"}
        content={"Articles"}
        key={"articles"}
      />
      <Menu.Item
        as={NavLink}
        to={"/markets"}
        content={"Market Updates"}
        key={"markets"}
      />

      <Menu.Item
        as={NavLink}
        to={"/services"}
        content={"Member Services"}
        key={"services"}
      />

      {isAuth() &&
        (isAuth().subscribes[0] == "dailystock" ||
          isAuth().role == "admin") && (
          <Fragment>
            <Menu.Item
              as={NavLink}
              to={"/daily-stock-pick"}
              content={"Stock Picks"}
              key={"daily-stock-pick"}
            />
          </Fragment>
        )}

      <Menu.Menu position="right">
        {isAuth() && isAuth().role == "subscriber" && (
          <Menu.Item
            as={NavLink}
            to={"/subscriptions"}
            content={"User Dashboard"}
            key={"private"}
          />
        )}

        {isAuth() && isAuth().role === "admin" && (
          <Fragment>
            <Menu.Item
              as={NavLink}
              to={"/adminboard"}
              content={"Admin Dashboard"}
              key={"admin"}
            />
          </Fragment>
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
            />
            <Menu.Item
              as={NavLink}
              to={"/signout"}
              content={"Sign Out"}
              key={"signout"}
            />
          </Fragment>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default NavBarDesktop;
