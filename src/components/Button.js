import React from "react";
import styles from "../modules/Button.module.css";

const Button = ({ onClick, id, type, nome, style, ...props }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      id={id}
      type={type}
      style={style}
      {...props}
    >
      {nome}
    </button>
  );
};

export default Button;
