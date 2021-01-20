import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Responsive } from "semantic-ui-react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

//use authContext
import { isAuth } from "../../pages/auth/helpers";

// const NavBarChildren = ({ children }) => (
//   // style={{ marginTop: "15em" }} add some styles
//   <Container>{children}</Container>
// );

const CustomMenu = ({ children, leftItems, rightItems }) => {
  const [visible, setVisible] = useState(false);

  const handlePusher = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const handleToggle = () => setVisible(!visible);

  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          // leftItems={leftItems}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={isAuth ? null : rightItems}
          visible={visible}
        >
          {children}
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop
          // leftItems={leftItems}
          rightItems={isAuth ? signOutItem : rightItems}
        />
        {children}
      </Responsive>
    </div>
  );
};

const leftItems = [
  { to: "/", content: "Home", key: "home" },
  {
    to: "/daily-stock-pick",
    content: "DailyStockPick",
    key: "daily-stock-pick",
  },
  { to: "/daily-update", content: "Daily-Update", key: "daily-update" },
  { to: "/articles", content: "Articles", key: "articles" },
  { to: "/private", content: "User Dashboard", key: "private" },
  { to: "/admin", content: "Admin Dashboard", key: "admin" },
  { to: "/about", content: "About", key: "about " },
];

const rightItems = [
  { as: "a", to: "/login", content: "Login", key: "login" },
  { as: "a", to: "/signup", content: "Register", key: "signup" },
];

const signOutItem = [
  { as: "a", to: "/signout", content: "Sign Out", key: "signout" },
];

const Layout = ({ children }) => {
  return (
    <>
      <CustomMenu leftItems={leftItems} rightItems={rightItems}>
        {children}
      </CustomMenu>
    </>
  );
};

export default withRouter(Layout);
