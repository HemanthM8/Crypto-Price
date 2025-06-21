import { createContext, useState,useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllcoin = async () => {
    const url =
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "YOUR-API-KEY",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setAllCoin(json))
      .catch((err) => console.error(err));
  };


useEffect(() => {
    fetchAllcoin();
}, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
