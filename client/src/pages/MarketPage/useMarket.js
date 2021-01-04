import { useEffect, useState, useContext } from "react";

import backend from "../../apis/backend";
import Wrapper from "../../components/Layout/Wrapper";
import AuthContext from "../../context/authContext";
import MarketComponent from "./MarketComponent";

const useMarket = () => {
  const [markets, setMarkets] = useState(null);
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = async () => {
    await backend
      .get("/markets")
      .then((res) => {
        console.log("markets", res.data);
        setMarkets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMarket = async (id) => {
    await backend
      .delete(`/markets/${id}/${isAuth()._id}`)
      .then((res) => {
        // console.log(res.data);
        getMarkets();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return [markets, setMarkets, getMarkets, deleteMarket];
};

export default useMarket;
