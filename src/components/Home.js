import React from "react";
import { Link } from "react-router-dom";
import styles from "../modules/Home.module.css";
import gifLoading from "./img/loadingBolha.gif";

const Home = () => {
  const [dados, setDados] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function apiProdutos(url) {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setDados(json);
      } catch (err) {
        setError(
          "Error: não foi possível capturar as informações da nossa API",
          err
        );
      } finally {
        setLoading(false);
      }
    }
    apiProdutos(`https://ranekapi.origamid.dev/json/api/produto`);
  }, []);

  if (loading || dados === null)
    return (
      <div className="divLoading animacaoLEFT paddingTop height100vh">
        <img
          src={gifLoading}
          alt="Loading"
          title="Loading"
          className="loadingGif"
        />
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="center animacaoLEFT paddingTop height100vh">
        <p className="error">
          {error}
        </p>
      </div>
    );

  const returnItemProdutos = item => {
    return (
      <div className="listProdutos" key={item.id}>
        <Link to={`produtos/${item.id}`}>
          <img
            className={styles.img}
            src={item.fotos[0].src}
            alt={item.fotos[0].titulo}
          />
          <h2 className={styles.nome}>
            {item.nome}
          </h2>
        </Link>
      </div>
    );
  };

  return (
    <section className={`${styles.home} animacaoLEFT`}>
      <div className={`${styles.grid} center`}>
        {dados &&
          dados.map(items => {
            return returnItemProdutos(items);
          })}
      </div>
    </section>
  );
};

export default Home;
