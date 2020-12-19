import React, { useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { withRouter } from "react-router-dom";
import { signout } from "../helpers";

const SignOut = ({ history }) => {
  useEffect(() => {
    signout(() => {
      console.log("sign out");
      history.push("/");
    });
  }, []);
  return (
    <Layout>
      <div>You have logged out. </div>
    </Layout>
  );
};

export default withRouter(SignOut);
