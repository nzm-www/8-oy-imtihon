import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Coins from './components/Coins';
import Details from './components/Details'; 

function App() {
  return (
    <div className="flex flex-col justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
