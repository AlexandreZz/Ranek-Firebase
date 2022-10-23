import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Produtos from "./components/Produtos";
import Contato from "./components/contato/Contato";
import Login from "./components/login/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import "./App.css";
import Preloading from "./components/Preloading";

function App() {
  return (
    <section>
      <BrowserRouter>
        <Header />
        {/* <Preloading /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="produtos/:id" element={<Produtos />} />
          <Route path="contato" element={<Contato />} />
          <Route path="login/*" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </section>
  );
}

export default App;
