import React from "react";
import DailyStock from "./DailyStock";
import useStocks from "./useStocks";

const RenderDailyStock = () => {
  const [
    dailyStocks,
    setDailyStocks,
    getDailyStocks,
    deleteDailyStock,
  ] = useStocks();

  const renderDailyStock = (dailyStocks) => {
    if (dailyStocks != null && dailyStocks.length > 0) {
      return dailyStocks.map((i) => {
        return (
          <DailyStock
            id={i._id}
            date={i.date}
            key={i.title}
            name={i.name}
            title={i.title}
            ticker={i.ticker}
            author={i.author}
            buy={i.buy}
            sell={i.sell}
            description={i.description}
            deleteDailyStock={deleteDailyStock}
          />
        );
      });
    }
  };
  return <>{renderDailyStock(dailyStocks)}</>;
};

export default RenderDailyStock;
