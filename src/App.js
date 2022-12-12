import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Produtos from "./components/Produtos";
import Contato from "./components/contato/Contato";
import Login from "./components/login/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import "./App.css";
import Preloading from "./components/Preloading";
import Main from "./components/Main";
import "./components/InitialFireBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function App() {
  const [logado, setLogado] = React.useState();
  const navigator = useNavigate();

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // const uid = user.uid;
        setLogado(true);
        navigator("/main");
      } else {
        // User is signed out
        setLogado(false);
        // navigator("/login");
      }
    });
  }, []);

  return (
    <section style={{ position: "relative" }}>
      <Header />
      <Preloading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="produtos/:id" element={<Produtos />} />
        <Route path="contato" element={<Contato />} />
        {logado === true
          ? <Route path="main/*" element={<Main />} />
          : <Route path="login/*" element={<Login />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
