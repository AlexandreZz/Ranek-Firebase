import React from "react";
import { Link } from "react-router-dom";
import styles from "../modules/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="center">
        <nav className={styles.desktop}>
          <ul>
            <li>
              <Link to="/">HOME</Link>
              <Link to="contato">CONTATO</Link>
              <Link to="login">LOGIN</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
