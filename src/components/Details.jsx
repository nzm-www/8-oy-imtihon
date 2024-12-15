import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

function Details() {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [series, setSeries] = useState([]);
  const [days, setDays] = useState(365);
  const [activeButton, setActiveButton] = useState(365); 

  const navigate = useNavigate();

  function handlenav() {
    navigate("/");
  }

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCoinDetails(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const fetchchart = (days) => {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart`;
    const params = `?vs_currency=usd&days=${days}`;

    return fetch(apiUrl + params)
      .then((response) => response.json())
      .then((data) =>
        data.prices.map((item) => ({
          x: new Date(item[0]), 
          y: item[1], 
        }))
      )
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  useEffect(() => {
    if (coinDetails) {
      fetchchart(days).then((prices) => {
        setSeries([
          { name: `${coinDetails?.name || "Coin"} Price`, data: prices },
        ]);
      });
    }
  }, [days, coinDetails, id]);

  if (!coinDetails) {
    return (
      <div className="flex justify-center items-center pt-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
          <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
          <p className="text-zinc-800 dark:text-zinc-400">
            Your adventure is about to begin
          </p>
        </div>
      </div>
    );
  }

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Time",
      },
    },
    colors: ["#1756a8"],
    stroke: {
      width: 3, 
    },
    yaxis: {
      title: {
        text: "Price (USD)",
      },
    },
    tooltip: {
      x: {
        format: "dd MMM HH:mm",
      },
    },
  };

  const handlechanch = (daysValue) => {
    setDays(daysValue); 
    setActiveButton(daysValue); 
  };

  return (
    <div className="bg-[#1d1d1d] gap-6 h-[940px] pl-8 pr-8 justify-between pt-14 flex">
      <div className="absolute">
        <button
          className="bg-white text-center w-24 rounded-lg h-10 relative text-black font-semibold group"
          type="button"
          onClick={handlenav}
        >
          <div className="bg-[#1756a8]  rounded-md text-white h-10 w-1/4 flex items-center justify-center absolute top-[0px] group-hover:w-[100px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>
      </div>
      <div className="text-white">
        <div className="w-[180px] text-center ml-36">
          <img
            src={coinDetails.image.large}
            alt={coinDetails.name}
            className="w-44 mb-5"
          />
          <h1 className="text-[42px] font-bold mb-5">{coinDetails.name}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p className="w-[545px] text-base">
            <span
              className="block max-h-[92px] overflow-y-scroll pr-2"
              dangerouslySetInnerHTML={{ __html: coinDetails.description.en }}
            ></span>
          </p>
          <p className="pt-7 text-2xl font-semibold mb-3">
            Rank: {coinDetails.market_cap_rank}
          </p>
          <p className="font-sans text-2xl flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold">Current Price:</span>$
            {coinDetails.market_data.current_price.usd}
          </p>
          <p className="font-sans flex items-center gap-2 text-2xl mb-3">
            <span className="text-2xl font-bold">Market Cap: $</span>
            {(coinDetails.market_data.market_cap.usd / 1e6).toFixed(2)}M
          </p>
        </div>
      </div>
      <div className="bg-white h-[740px] w-[1px]"></div>
      <div>
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={600}
        />
        <div className="flex pt-7 gap-4 justify-between">
          {[
            { label: "24 Hour", value: 1 },
            { label: "30 Days", value: 30 },
            { label: "3 Months", value: 90 },
            { label: "1 Year", value: 365 },
          ].map((btn) => (
            <button
              key={btn.value}
              className={`text-start pl-6 border border-[#5c9fba] text-white h-[41px] w-[285px] rounded-md font-semibold ${
                activeButton === btn.value ? "bg-[#1756a8] text-black" : "hover:bg-[#87CEEB] hover:text-black hover:border-[#1756a8] hover:border"
              }`}
              onClick={() => handlechanch(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Details;
