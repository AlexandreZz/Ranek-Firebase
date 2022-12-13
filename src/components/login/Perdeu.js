import React from "react";
import styles from "../../modules/Perdeu.module.css";
import Button from "../Button";
import Input from "../Input";
import gifLoading from "../img/loadingBolha.gif";
import "../InitialFireBase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const Perdeu = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sucess, setSucess] = React.useState(false);
  const navigator = useNavigate();

  const handleSubmitReset = (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setLoading(false);
          setSucess(
            "Enviamos um link para você redefinir sua senha, não se esqueça de verificar sua caixa de spam!"
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case "auth/user-not-found":
              setError(
                "Não há nenhum registro de usuário correspondente a este identificador. O usuário pode ter sido deletado ou nunca ter existido."
              );
              break;
            case "auth/invalid-email":
              setError("O endereço de e-mail está mal formatado.");
              break;
            default:
              setError(
                "Ocorreu um erro inesperado. Por favor, tente novamente em alguns minutos."
              );
              break;
          }
          console.log(errorCode);
        });
    } catch (error) {
      setError("Não conseguimos acessar nossa API, Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
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
    setTimeout(() => {
      setError(false);
    }, 6500);

  if (sucess)
    setTimeout(() => {
      setSucess(false);
      navigator("/login");
    }, 6500);

  return (
    <section className={`${styles.perdeuPass} animacaoLEFT`}>
      <h1 className="tituloPadrao">Perdeu a senha?</h1>
      <form onSubmit={handleSubmitReset}>
        {error && (
          <p
            className="error"
            style={{
              width: "330px",
              padding: "10px 5px",
              margin: "10px auto 0 auto",
            }}
          >
            {error}
          </p>
        )}
        {sucess && (
          <p
            className="sucess"
            style={{
              width: "330px",
              padding: "10px 5px",
              margin: "10px auto 0 auto",
            }}
          >
            {sucess}
          </p>
        )}
        <Input
          type="email"
          name="newPass"
          id="newPass"
          label="E-mail"
          value={email}
          required
          onChange={({ target }) => setEmail(target.value)}
        />
        <Button nome="Enviar Email" type="submit" />
      </form>
    </section>
  );
};

export default Perdeu;
