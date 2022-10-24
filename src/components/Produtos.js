import React from "react";
import { useParams } from "react-router-dom";
import styles from "../modules/Produtos.module.css";
import gifLoading from "./img/loadingBolha.gif";

const Produtos = () => {
  const [produto, setProduto] = React.useState();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();

  React.useEffect(
    () => {
      const fetchIdProdutos = async url => {
        try {
          setLoading(true);
          const response = await fetch(url);
          const json = await response.json();
          setProduto(json);
        } catch (error) {
          setError(
            "Error: não foi possível capturar as informações da nossa API"
          );
        } finally {
          setLoading(false);
        }
      };
      fetchIdProdutos(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
    },
    [id]
  );

  const handleClick = () => {
    setError(
      "Error: Para comprar este produto faça o login ou crie uma conta."
    );

    setTimeout(() => {
      setError(false);
    }, 3500);
  };

  if (error)
    return (
      <div className="center animacaoLEFT">
        <p className="error">
          {error}
        </p>
      </div>
    );

  if (loading || produto === null)
    return (
      <div className="divLoading animacaoLEFT">
        <img
          src={gifLoading}
          alt="Loading"
          title="Loading"
          className="loadingGif"
        />
        <p>Loading...</p>
      </div>
    );

  if (produto)
    return (
      <section className={`${styles.Produtos} animacaoLEFT`}>
        <div className={`${styles.just} flex center`}>
          <div>
            {produto &&
              produto.fotos.map(({ titulo, src }) =>
                <img
                  src={src}
                  title={titulo}
                  alt={titulo}
                  key={titulo}
                  className={styles.produtosIMG}
                />
              )}
          </div>
          <div className={styles.descricao}>
            <h1>
              {produto.nome}
            </h1>
            <span>
              R$  {produto.preco}
            </span>
            <p>
              {produto.descricao}
            </p>
            <button onClick={handleClick}>Comprar</button>
          </div>
        </div>
      </section>
    );
};

export default Produtos;
