import React, { useState, useContext, useEffect } from "react";

import { Redirect } from "react-router-dom";
import AuthContext from "../../context/authContext";

import backend from "../../apis/backend";
import Layout from "../../components/Layout/Layout";
import { useHistory } from "react-router-dom";

function StripeLogin() {
  let { priceId } = useHistory().location.state;

  // const user = isAuth();

  const { isAuth } = useContext(AuthContext);
  let user = isAuth();

  const [email, setEmail] = useState(user.email);
  const [customer, setCustomer] = useState(null);

  //check if custermer exist, or create one
  //need customerId, get it from user
  let stripeCustomerId = user.stripeCustomerId;
  useEffect(() => {
    getStripeCustomer(stripeCustomerId);
    console.log(customer);
  });

  const createStripeUser = (email) => {
    backend
      .post("/create-customer", {
        email: email,
      })
      .then((result) => {
        setCustomer(result.customer);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    return fetch(`${process.env.REACT_APP_API}/create-customer`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setCustomer(result.customer);
      });
  };

  const getStripeCustomer = (customerId) => {
    // evt.preventDefault();
    backend
      .post("/get-customer", {
        customerId: customerId,
      })
      .then((result) => {
        console.log(result);
        setCustomer(result.data.customer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (customer) {
    return (
      <Redirect
        to={{
          pathname: "/prices",
          state: { customer: customer },
        }}
      />
    );
  } else {
    return (
      <Layout>
        <div>
          <div className="antialiased p-6">
            {/* <TopNavigationBar loggedIn={false} /> */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm m-6">
                <div className="text-pasha font-semibold text-xl mb-4">
                  Daily Stock Picks, and more. Cancel anytime.
                </div>
                <form id="signup-form" onSubmit={handleSubmit}>
                  <div className="w-full mb-2">
                    <input
                      className="appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pasha"
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <button
                    id="email-submit"
                    className="w-full bg-pasha hover:bg-red-200 hover:shadow-outline rounded-md hover:text-pasha hover:border hover:border-black focus:shadow-outline text-white focus:bg-white focus:text-pasha font-light py-2 px-4 rounded"
                    type="submit"
                  >
                    <div id="loading" className="hidden">
                      Signing up...
                    </div>
                    <span id="button-text">Sign up</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default StripeLogin;
