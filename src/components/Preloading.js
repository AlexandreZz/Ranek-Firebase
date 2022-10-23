import React from "react";
import styles from "../modules/Preloading.module.css";
import foto from "./img/loading.gif";

const Preloading = () => {
  window.onload = function(timer = "", opacidade = 1) {
    const [preloader, img] = [
      document.getElementById("preloader"),
      document.getElementById("LoadingGif")
    ];

    timer = setInterval(() => {
      opacidade -= 0.1;
      if (opacidade < 0.3) {
        preloader.style.opacity = opacidade;
        img.style.opacity = opacidade;
        setTimeout(() => {
          opacidade = 1;
          preloader.style.display = "none";
          img.style.display = "none";
        }, 350);
        clearInterval(timer);
      }
    }, 250);
  };
  return (
    <div className={styles.preloader} id="preloader">
      <img
        className={styles.LoadingGif}
        id="LoadingGif"
        src={foto}
        alt="AJAX-LOADING"
        title="AJAX-LOADING"
      />
      <p style={{ marginLeft: "129px" }}>loading...</p>
    </div>
  );
};

export default Preloading;
