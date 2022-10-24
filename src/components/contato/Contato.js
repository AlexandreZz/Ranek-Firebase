import React from "react";
import styles from "../../modules/Contato.module.css";
import datilografia from "../img/datilografia.jpg";

const Contato = () => {
  return (
    <section className={`${styles.contato} flex animacaoLEFT center`}>
      <div className={styles.image}>
        <img src={datilografia} alt="DATILOGRAFIA" title="DATILOGRAFIA" />
      </div>
      <div className={styles.descricao}>
        <h2>Entre em contato.</h2>
        <p>
          <span />AlexandreZz@email.com
        </p>
        <p>
          <span />9999-9999
        </p>
        <p>
          <span />Rua Ali Perto,999
        </p>
      </div>
    </section>
  );
};

export default Contato;
