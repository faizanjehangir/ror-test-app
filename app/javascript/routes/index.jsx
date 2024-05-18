import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Offers from "../components/Offers";
import Account from "../components/Account";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  </Router>
);