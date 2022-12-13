import React, { useRef } from "react";
import styles from "../../modules/Login.module.css";
import Button from "../Button";
import Input from "../Input";
import "../InitialFireBase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth();

const LoginForm = () => {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState(null);
  const refButton = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    refButton.current.innerText = "Carregando...";

    signInWithEmailAndPassword(auth, usuario, senha)
      .then(() => {
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (`${errorCode}`) {
          case "auth/user-not-found":
            setError(
              "Não há registro para este usuário, crie um usuário para fazer login."
            );
            break;
          case "auth/wrong-password":
            setError("A senha é inválida ou o usuário não possui uma senha");
            break;
          case "auth/too-many-requests":
            setError(
              "O acesso a esta conta foi desabilitado por muitas tentativas com falha. Por favor, tente novamente em alguns minutos ou redefina a sua senha."
            );
            break;
          default:
            setError("Ocorreu um erro na aplicação.", errorCode);
        }

        setTimeout(() => {
          setError(null);
          refButton.current.innerText = "Entrar";
        }, 3500);
      });
  };

  return (
    <section
      style={{ width: "40%" }}
      className={`${styles.sectionForm} animacaoLEFT`}
    >
      <div className={`${styles.loginForm} animacaoLEFT`}>
        <h1 className="tituloPadrao">Log In</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <Input
            type="email"
            label="E-mail"
            id="user"
            name="user"
            value={usuario}
            onChange={({ target }) => setUsuario(target.value)}
            required
          />
          <Input
            type="password"
            label="Senha"
            id="pass"
            name="pass"
            value={senha}
            onChange={({ target }) => setSenha(target.value)}
            required
          />
          <Button
            onClick={({ target }) => {
              refButton.current = target;
            }}
            nome="Entrar"
            type="submit"
          />
        </form>
        <Link className={styles.perdeuSenha} to="/login/perdeu">
          Perdeu a Senha?
        </Link>
        <Link
          style={{ margin: "0 20px" }}
          className={styles.perdeuSenha}
          to="/login/criar"
        >
          Criar uma conta
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
