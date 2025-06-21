import React from "react";
import Chart from "react-google-charts";
import { useState } from "react";
import { data } from "react-router-dom";
import { useEffect } from "react";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);
  useEffect(() => {
    let dataCopy = [["Date", "Price"]];
    if (historicalData.prices) {
      historicalData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}]`,
          item[1],
        ]);
      });
    }
    setData(dataCopy);
  }, [historicalData]);
  return <Chart data={data} chartType="LineChart" height="100%" legendToggle/>;
};

export default LineChart;
