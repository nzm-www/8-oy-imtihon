
import React, { createContext, useState, useContext } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (coin) => {
    setWatchlist((prevList) => [...prevList, coin]);
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist((prevList) => prevList.filter((coin) => coin.id !== coinId));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
