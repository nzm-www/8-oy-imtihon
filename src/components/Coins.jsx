import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useCurrency } from "../context/CurrencyContext"; 

function Coins() {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 1000);
  const { currency } = useCurrency(); 
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams({
      vs_currency: currency.toLowerCase(), 
      order: "gecko_desc",
      per_page: "10",
      sparkline: "false",
      price_change_percentage: "24h",
    });

    fetch(`https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setCoin(data))
      .catch((err) => console.error(err));
  }, [debouncedValue, currency]); 

  const handleCoinClick = (c) => {
    const savedCoins = JSON.parse(localStorage.getItem("watchlist")) || [];
    savedCoins.push({ name: c.name, image: c.image });
    localStorage.setItem("watchlist", JSON.stringify(savedCoins));

    navigate(`/details/${c.id}`);
  };

  return (
    <div className="h-[1200px] bg-[#1d1d1d] pt-5 flex flex-col items-center pb-10">
      <h2 className="text-center text-4xl text-white pb-5">
        Cryptocurrency Prices by Market Cap
      </h2>
      <div className="pb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border pl-4 pr-4 text-white text-base font-semibold w-[1232px] h-14 bg-[#fff0] rounded-md border-[#ffffff8e]"
          placeholder="Search For a Crypto Currency..."
          type="text"
        />
      </div>
      <div className="pl-4 font-bold pr-4 flex items-center justify-between h-16 w-[1232px] bg-[#87CEEB] rounded-sm">
        <div>
          <h3>Coin</h3>
        </div>
        <div className="flex items-center gap-44">
          <h3 className="text-base font-semibold">Price</h3>
          <h3 className="text-base font-semibold">24h Change</h3>
          <h3 className="text-base font-semibold">Market Cap</h3>
        </div>
      </div>

      {coin.map((c) => (
        <div
          className="shadow-2xl pr-4 flex text-white items-center justify-between w-[1212px] pt-5 border-b-2 border-gray-600 pb-4 cursor-pointer"
          key={c.id}
          onClick={() => handleCoinClick(c)} 
        >
          <div className="flex gap-4 items-center pl-3">
            <img className="w-10" src={c.image} alt={c.name} />
            <span className="flex flex-col">
              <h2 className="uppercase font-semibold text-lg">{c.symbol}</h2>
              <p className="text-xs text-[#ffffffb8]">{c.name}</p>
            </span>
          </div>
          <div className="flex gap-40 items-center">
            <h3>{new Intl.NumberFormat("en-US", { style: "currency", currency }).format(c.current_price)}</h3>
            <div
              className={`flex items-center gap-2 ${
                c.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <IoEye />
              {c.price_change_percentage_24h > 0
                ? `+${c.price_change_percentage_24h.toFixed(2)}%`
                : `${c.price_change_percentage_24h.toFixed(2)}%`}
            </div>
            <h3>${(c.market_cap / 1e6).toFixed(2)}M</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Coins;
