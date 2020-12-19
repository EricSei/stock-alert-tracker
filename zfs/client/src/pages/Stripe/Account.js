import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
import PriceChangeForm from "./PriceChangeForm";
import Layout from "../../components/Layout/Layout";
import StripeContext from "../../context/StripeContext";
import AuthContext from "../../context/authContext";

const products = [
  {
    key: 0,
    price: "$5.00",
    name: "Basic",
    interval: "month",
    billed: "monthly",
  },
  {
    key: 1,
    price: "$15.00",
    name: "Premium",
    interval: "month",
    billed: "monthly",
  },
];

let services = [
  {
    key: 0,
    price: "$15.00",
    name: "dailystock",
    interval: "month",
    billed: "monthly",
    title: "Daily Stock Pick",
    fees: 15.0,
    description: "Daily Stocks picked by our professionals",
    priceId: `${process.env.REACT_APP_BASIC}`,
  },
];

function Account({ location }) {
  const { isAuth, updateUser, getCookie } = useContext(AuthContext);
  const token = getCookie("token");

  const { accountInformation } = useContext(StripeContext);
  const { customer } = useContext(StripeContext);
  console.log("customer", customer);

  console.log("accountcontext", accountInformation);

  // const [accountInformation] = useState(location.state.accountInformation);
  // const [accountInformation] = useState(accountInformation);

  let [customerPaymentMethod, setCustomerPaymentmethod] = useState(null);
  let [showChangePriceForm, setShowChangePriceForm] = useState(false);
  let [subscriptionCancelled, setSubscriptionCancelled] = useState(false);
  let [newProductSelected, setNewProdctSelected] = useState("");
  let [selectedProduct, setSelectedProduct] = useState(
    accountInformation["priceId"]
  );
  let [selectedProductName] = useState(accountInformation["priceId"]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch(
        `${process.env.REACT_APP_API}/retrieve-customer-payment-method`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: accountInformation.paymentMethodId,
          }),
        }
      );
      const responseBody = await response.json();
      const paymentMethod =
        responseBody.card.brand + " •••• " + responseBody.card.last4;

      setCustomerPaymentmethod(paymentMethod);
    }
    fetchData();
  }, [accountInformation.paymentMethodId]);

  const retrieveSubscriptions = () => {};

  const handleChangePriceForm = () => {
    setShowChangePriceForm(true);
  };

  function handleClick(key) {
    setNewProdctSelected(services[key].name);
  }

  //subscribe comes from productedSelcted

  const handleUnSubscribe = (selectedProductName) => {
    console.log("unSubscribe", selectedProductName);

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/deleteSubscribe`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id: isAuth()._id, unSubscribe: selectedProductName },
    })
      .then((result) => {
        console.log("result", result);
        updateUser(result, () => console.log("user updated with subscribed."));
      })
      .catch((error) => console.log(error));
  };

  function cancelSubscription(selectedProductName) {
    console.log(accountInformation.subscription);
    console.log(selectedProductName);
    handleUnSubscribe(selectedProductName);
    fetch(`${process.env.REACT_APP_API}/cancel-subscription`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionId: accountInformation.subscription.id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((cancelSubscriptionResponse) => {
        //unsubscribe here

        setSubscriptionCancelled(true);
      });
  }

  function navigateUserDashboard() {
    // localStorage.clear();
    window.location.href = "/";
  }

  return (
    <Layout>
      <div>Account</div>
      <div
        className="flex justify-between mt-2 mb-2 text-gray-900 font-bold text-xl cursor-pointer"
        onClick={() => cancelSubscription(selectedProductName)}
      >
        <span>
          Cancel subscription <span>→</span>
        </span>
      </div>
    </Layout>
  );

  // return (
  //   <Layout>
  //     <div className="p-6">
  //       {subscriptionCancelled ? (
  //         <div>
  //           <div className="flex flex-wrap font-bold text-pasha text-xl mt-6 mb-2">
  //             Subscription canceled
  //           </div>
  //           <div>
  //             <button
  //               className="bg-pasha hover:bg-white hover:shadow-outline hover:text-pasha hover:border hover:border-black focus:shadow-outline text-white focus:bg-white focus:text-pasha font-light py-2 px-4 rounded"
  //               type="button"
  //               onClick={() => navigateUserDashboard()}
  //             >
  //               Go Back to Home
  //             </button>
  //           </div>
  //         </div>
  //       ) : (
  //         <div>
  //           <div className="flex flex-wrap justify-center mt-4">
  //             <div className="md:w-2/5 w-full inline-block rounded-md p-4">
  //               <div
  //                 id="subscription-status-text"
  //                 className="text-center font-bold text-pasha text-2xl"
  //               >
  //                 Subscription Settings
  //               </div>
  //               <div className="mt-4 border rounded p-4">
  //                 <div className="font-bold text-xl mb-2">Account</div>
  //                 <div className="flex justify-between text-gray-600 text-xl">
  //                   <div>Subscription: {selectedProductName}</div>
  //                   <div className="font-bold text-xl mb-2">
  //                     {selectedProduct}
  //                   </div>
  //                 </div>

  //                 <div className="flex justify-between">
  //                   <div className="text-xl text-gray-600">Credit card</div>
  //                   <span
  //                     id="credit-card-last-four"
  //                     className="font-bold text-xl text-gray-600"
  //                   >
  //                     {customerPaymentMethod}
  //                   </span>
  //                 </div>

  //                 {/* <div
  //                   className="flex justify-between mt-2 mb-2 text-gray-900 font-bold text-xl cursor-pointer"
  //                   onClick={() => handleChangePriceForm()}
  //                 >
  //                   <span>
  //                     Change pricing plan <span>→</span>
  //                   </span>
  //                 </div> */}

  //                 <div
  //                   className="flex justify-between mt-2 mb-2 text-gray-900 font-bold text-xl cursor-pointer"
  //                   onClick={() => cancelSubscription(selectedProductName)}
  //                 >
  //                   <span>
  //                     Cancel subscription <span>→</span>
  //                   </span>
  //                 </div>
  //               </div>

  //               {/* {showChangePriceForm ? (
  //                 <div id="prices-form" className="w-full md:mb-8">
  //                   <div className="text-center text-pasha font-bold text-2xl mt-4 mb-6">
  //                     Change pricing plan
  //                   </div>
  //                   <div className="flex justify-between mt-8 mb-8">
  //                     {services.map((product, index) => {
  //                       let currentProductSelected = false;
  //                       if (product.name === selectedProduct) {
  //                         currentProductSelected = true;
  //                       }
  //                       return (
  //                         <Product
  //                           key={index}
  //                           product={product}
  //                           currentProductSelected={currentProductSelected}
  //                           handleClick={handleClick}
  //                         />
  //                       );
  //                     })}
  //                   </div>
  //                   {newProductSelected ? (
  //                     <PriceChangeForm
  //                       customerId={accountInformation.subscription.customer}
  //                       subscriptionId={accountInformation.subscription.id}
  //                       currentProductSelected={selectedProduct}
  //                       newProductSelected={newProductSelected}
  //                       setShowChangePriceForm={setShowChangePriceForm}
  //                       setSelectedProduct={setSelectedProduct}
  //                     />
  //                   ) : null}
  //                 </div>
  //               ) : null} */}
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </Layout>

  // );
}

export default withRouter(Account);
