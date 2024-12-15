import React, { useState, useEffect } from "react";
import { useCurrency } from "../context/CurrencyContext";
function Header() {
  const { currency, changeCurrency } = useCurrency();
  const [saydbar, setSaydbar] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, []);
  const handlechangeval = (e) => {
    changeCurrency(e.target.value);
  };
  
  const delwatchlst = (indexToRemove) => {
    const updatedWatchlist = watchlist.filter((_, index) => index !== indexToRemove);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSaydbar(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-[#1d1d1d] relative">
      <div className="flex pl-[220px] justify-between pr-[220px] h-[64px] items-center">
        <h2 className="text-xl font-semibold text-[#87CEEB]"> 
          <a href="https://www.coingecko.com/">
          CRYPTOFOLIO
          </a>
          </h2>
        <div className="flex gap-5">
          <select
            className="bg-[#fff0] w-16 text-white font-semibold text-base"
            value={currency}
            onChange={handlechangeval}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="NZD">NZD</option>
          </select>
          <button
            onClick={() => setSaydbar(true)}
            className="bg-[#87CEEB] font-medium w-[143px] pl-[15px] pr-[15px] rounded pt-2 pb-2"
          >
            WATCH LIST
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 z-10 h-screen w-[400px] bg-[#515151] text-white shadow-lg transition-transform duration-300 ${
          saydbar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-2xl font-bold">WATCHLIST <span className="text-red-600 text-xs">esc</span></h2>
          <button
            onClick={() => setSaydbar(false)}
            className="text-white text-4xl font-bold"
          >
            &times;
          </button>

        </div>
        <div className="p-4 flex flex-wrap gap-12">
          {watchlist.length > 0 ? (
            watchlist.map((item, index) => (
              <div key={index} className="flex w-[160px] justify-center items-center h-[180px] rounded-2xl flex-col bg-[#14161A]  gap-4 mb-4">
                <div className="flex gap-4  items-center flex-col">
                  <img className="w-20" src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                </div>
                <button
                  onClick={() => delwatchlst(index)}
                  className="bg-[#d91717] text-white w-[80px] "
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">No items in Watchlist</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
