import React from "react";
import { CurrencyProvider } from "../context/CurrencyContext";
import Header from "./Header";
import Course from "./Course";
import Coins from "./Coins"; 
import "./Home.css";

function Home() {
  return (
    <div>
      <CurrencyProvider>
        <Header />
        <div className="bgfon items-center flex justify-center">
          <Course />
        </div>
        <div className="pt-[400px]">
          <Coins />
        </div>
      </CurrencyProvider>
    </div>
  );
}

export default Home;
