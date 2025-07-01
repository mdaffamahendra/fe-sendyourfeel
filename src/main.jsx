import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Create from "./pages/Create";
import Read from "./pages/Read";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import History from "./pages/History";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/history" element={<History/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
