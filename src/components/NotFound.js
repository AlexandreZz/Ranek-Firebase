import React from "react";
import notFoundImage from "./img/404.png";

const NotFound = () => {
  return (
    <div className="animacaoLeft paddingTop notfound">
      <img src={notFoundImage} alt="NOTFOUND" title="NOTFOUND" />
      <h1>Não Encontrado</h1>
      <p>Desculpe, não encontramos o que você está procurando</p>
    </div>
  );
};

export default NotFound;
