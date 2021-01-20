import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/authContext";

import { todayDate } from "../../utilities/date";

const useStocks = () => {
  const { isAuth, getCookie } = useContext(AuthContext);
  const [dailyStocks, setDailyStocks] = useState(null);

  let myDate = todayDate();
  const token = getCookie("token");

  useEffect(() => {
    getDailyStocks();
  }, []);

  const getDailyStocks = async () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/stocks/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setDailyStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDailyStock = async (id) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/stocks/${id}/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        getDailyStocks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleChange = (name) => (event) => {
  //   console.log(event.target.value);
  //   // console.log()
  //   setPayload({ ...payload, [name]: event.target.value });
  // };

  return [dailyStocks, setDailyStocks, getDailyStocks, deleteDailyStock];
};

export default useStocks;
