import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const PieChart = ({ pastData }) => {
  const [chartData, setChartData] = useState([["Date", "prices"]]);

  useEffect(() => {
    let data = [["Date", "Prices"]];
    if (pastData.prices) {
      pastData.prices.map((item) => {
        data.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]])
      })
      setChartData(data);
    }
  }, [pastData])
  return (
    <Chart
      chartType='PieChart'
      data={chartData}
      height='100%' legendToggle
    />
  )
}

export default PieChart