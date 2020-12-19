import React, { useEffect, useState } from "react";

const StripeContext = React.createContext();

export const StripeProvider = ({ children }) => {
  const [accountInformation, setAccountInformation] = useState(() => {
    const value = window.localStorage.getItem("accountInformation");
    return value !== null ? JSON.parse(value) : {};
  });

  const [customer, setCustomer] = useState(() => {
    const value = window.localStorage.getItem("customer");
    return value !== null ? JSON.parse(value) : {};
  });

  useEffect(() => {
    window.localStorage.setItem(
      "accountInformation",
      JSON.stringify(accountInformation)
    );

    window.localStorage.setItem("customer", JSON.stringify(customer));
  }, [accountInformation, customer]);

  return (
    <StripeContext.Provider
      value={{
        accountInformation: accountInformation,
        setAccountInformation: setAccountInformation,
        customer,
        setCustomer,
      }}
    >
      {children}
    </StripeContext.Provider>
  );
};

export default StripeContext;
