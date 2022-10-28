import React from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "../modules/Header.module.css";
import gifLoading from "./img/loadingBolha.gif";
import "./InitialFireBase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Button from "./Button";
import foto from "../components/img/usuario.svg";

const auth = getAuth();

const Header = () => {
  const [logado, setLogado] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(
    () => {
      onAuthStateChanged(auth, user => {
        try {
          setLoading(true);
          if (user) {
            setLogado(true);
          } else {
            setLogado(false);
          }
        } catch (error) {
          setError("Ocorreu um erro na aplicação");
        } finally {
          setLoading(false);
        }
      });
    },
    [logado]
  );

  const handleClick = () => {
    signOut(auth).then(() => {
      setLogado(false);
    });
  };

  if (loading)
    return (
      <div className="divLoading animacaoLEFT " style={{ height: "40px" }}>
        <img
          style={{ width: "80px" }}
          src={gifLoading}
          alt="Loading"
          title="Loading"
          className="loadingGif"
        />
        <p style={{ display: "block", top: "-54px", left: "94px" }}>
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="center animacaoLEFT paddingTop">
        <p className="error">
          {error}
        </p>
      </div>
    );

  return (
    <header className={styles.header}>
      <div className="center">
        {logado === true
          ? <nav className={`${styles.desktop} ${styles.just} flex`}>
              <ul>
                <li>
                  <Link to="/">HOME</Link>
                  <Link to="contato">CONTATO</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Button
                    onClick={handleClick}
                    nome="Sair"
                    style={{
                      fontSize: "14px",
                      padding: "5px 10px",
                      minWidth: "5rem",
                      margin: "0"
                    }}
                  />
                </li>
                <li>
                  <Link to="main" className={styles.main}>
                    Painel{" "}
                    <img
                      style={{ width: "10px", marginLeft: "10px" }}
                      src={foto}
                    />
                  </Link>
                </li>
              </ul>
            </nav>
          : <nav className={styles.desktop}>
              <ul>
                <li>
                  <Link to="/">HOME</Link>
                  <Link to="contato">CONTATO</Link>
                  <Link to="login">LOGIN</Link>
                </li>
              </ul>
            </nav>}
      </div>
    </header>
  );
};

export default Header;
