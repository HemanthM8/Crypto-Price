import React, { useContext, useEffect } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "YOUR-API-KEY",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setCoinData(json))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-dNfBJ6YAjhE89rR6YrpuCBqB",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setHistoricalData(json))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt={coinData.name} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24h High</li>
            <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24h Low</li>
            <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
