import React from "react";
import styles from "../../modules/Login.module.css";
import landscape from "../img/bg-01.jpg";
import { Route, Routes } from "react-router-dom";
import Perdeu from "./Perdeu";
import LoginForm from "./LoginForm";
import Criar from "./Criar";

/***** FIREBASE CONFIGURAÇÃO *****/

/***** FIREBASE CONFIGURAÇÃO *****/

const Login = () => {
  return (
    <section className={`${styles.login}  flex animacaoLEFT`}>
      <div className={`${styles.image}`}>
        <img src={landscape} alt="LOGIN" title="LOGIN" />
        <div className={styles.overlay} />
      </div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="perdeu" element={<Perdeu />} />
        <Route path="criar" element={<Criar />} />
      </Routes>
    </section>
  );
};

export default Login;
