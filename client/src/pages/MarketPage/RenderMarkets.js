import React, { useEffect, useState, useContext } from "react";
import MarketComponent from "./MarketComponent";
import useMarket from "./useMarket";

const RenderMarkets = () => {
  const [markets, setMarkets, getMarkets, deleteMarket] = useMarket();

  const renderMarkets = (markets) => {
    if (markets != null && markets.length > 0) {
      return markets.map((i) => {
        return (
          <MarketComponent
            id={i._id}
            key={i.title}
            title={i.title}
            desc={i.description}
            author={i.author}
            deleteMarket={deleteMarket}
          />
        );
      });
    }
  };
  return <>{renderMarkets(markets)}</>;
};

export default RenderMarkets;
