import React, { useRef } from "react";
import styles from "../../modules/Login.module.css";
import Button from "../Button";
import landscape from "../img/bg-01.jpg";
import Input from "../Input";
import pencil from "../img/pencil.svg";
import close from "../img/close.svg";
import "../InitialFireBase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
// import { Navigate, useNaviganpm tartste } from "react-router-dom";

/***** FIREBASE CONFIGURAÇÃO *****/
const auth = getAuth();

/***** FIREBASE CONFIGURAÇÃO *****/

const Login = () => {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loginOrCadastro, setLoginOrCadastro] = React.useState(false);
  // const navigator = useNavigate();
  const refButton = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    refButton.current.innerText = "Carregando...";

    signInWithEmailAndPassword(auth, usuario, senha)
      .then(userCredential => {
        // const user = userCredential.user;
      })
      .catch(error => {
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

  const handleSubmitCadastrar = event => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, usuario, senha)
      .then(userCredential => {
        // const user = userCredential.user;
      })
      .catch(error => {
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/weak-password":
            setError("A senha deve ter pelo menos 6 caracteres");
            break;
          case "auth/email-already-in-use":
            setError(
              "O endereço de e-mail já está sendo usado por outra conta."
            );
            break;
          default:
            setError("Ocorreu um erro na aplicação.", errorCode);
        }
        // ..
      });
  };

  const handleClickLoginOrCadastro = ({ target }) => {
    let ImageSrc = "";
    if (target.src !== undefined) ImageSrc = target.src.split("/");

    if (
      ImageSrc[ImageSrc.length - 1] ===
      "pencil.eb14839dadb5a20f9a6cbad57485c327.svg"
    ) {
      target.src = close;
      setLoginOrCadastro(true);
    } else {
      target.src = pencil;
      setLoginOrCadastro(false);
    }
  };

  const formLogin = () => {
    return (
      <div className={styles.loginForm}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          {error &&
            <p className="error">
              {error}
            </p>}
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
      </div>
    );
  };

  const formCadastro = () => {
    return (
      <div className={styles.cadastroForm}>
        <h1>Cadastrar</h1>
        <form onSubmit={handleSubmitCadastrar}>
          {error &&
            <p className="error">
              {error}
            </p>}
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
            nome="Cadastrar"
            type="submit"
          />
        </form>
      </div>
    );
  };

  return (
    <section className={`${styles.login}  flex animacaoLEFT`}>
      <div className={`${styles.image} `}>
        <img src={landscape} alt="LOGIN" title="LOGIN" />
        <div className={styles.overlay} />
      </div>
      <div className={`${styles.formulario} `}>
        <div className={styles.botoes}>
          <Button
            onClick={handleClickLoginOrCadastro}
            nome={
              <img
                style={{ width: "38px", height: "16px" }}
                src={pencil}
                alt="ICON"
                title="ICON"
              />
            }
          />
        </div>
        {loginOrCadastro === false ? formLogin() : formCadastro()}
      </div>
    </section>
  );
};

export default Login;
