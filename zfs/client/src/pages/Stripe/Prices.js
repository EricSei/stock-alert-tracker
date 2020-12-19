import React, { useEffect, useState, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import Product from "./Product";
import backend from "../../apis/backend";

import Layout from "../../components/Layout/Layout";
import AuthContext from "../../context/authContext";
import StripeContext from "../../context/StripeContext";

// const products = [
//   {
//     key: 0,
//     price: "$1.00",
//     name: "Basic",
//     interval: "month",
//     billed: "monthly",
//   },
//   {
//     key: 1,
//     price: "$120.00",
//     name: "Annualy",
//     interval: "year",
//     billed: "yearly",
//   },
//   {
//     key: 2,
//     price: "$15.00",
//     name: "Premium",
//     interval: "month",
//     billed: "monthly",
//   },
// ];

const Prices = () => {
  let history = useHistory();
  //create customer by using methods from Stripe Login
  //
  const { isAuth } = useContext(AuthContext);
  const { customer, setCustomer } = useContext(StripeContext);
  let user = isAuth();

  const [productSelected, setProduct] = useState(
    history.location.state.productSelected
  );
  const [stripeCustomerId, setStripeCustomerId] = useState(
    user.stripeCustomerId
  );
  // const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (stripeCustomerId === "") {
      createStripeUser(user.email);
    } else {
      getStripeCustomer(stripeCustomerId);
    }
  }, []);

  const createStripeUser = (email) => {
    backend
      .post("/create-customer", {
        email: email,
      })
      .then((result) => {
        setCustomer(result.data.customer);
        setStripeCustomerId(result.data.customer.id);
      });
  };

  const getStripeCustomer = (customerId) => {
    // evt.preventDefault();
    backend
      .post("/get-customer", {
        customerId: customerId,
      })
      .then((result) => {
        console.log("this is customer data", result.data);
        setCustomer(result.data.customer);
        setStripeCustomerId(result.data.customer.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      {customer ? (
        <PaymentForm productSelected={productSelected} customer={customer} />
      ) : null}
    </Layout>
  );

  // return (
  //   <Layout>
  //   <div className="p-6">
  //     <div className="flex flex-wrap justify-center">
  //       <div className="md:w-1/3 w-full mr-4 md:mb-8">
  //         <div className="text-center text-pasha font-bold text-2xl mt-4 mb-6">
  //           Subscribe to Memberservices
  //         </div>

  //         <div className="flex justify-between mb-8">
  //           {products.map((product, index) => {
  //             return (
  //               <Product
  //                 key={index}
  //                 product={product}
  //                 handleClick={handleClick}
  //               />
  //             );
  //           })}
  //         </div>
  //         {productSelected ? (
  //           <PaymentForm
  //             productSelected={productSelected}
  //             customer={customer}
  //           />
  //         ) : null}
  //       </div>
  //     </div>
  //   </div>
  //   </Layout>
  // );
};

export default Prices;
