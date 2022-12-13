import React, { useRef } from "react";
import styles from "../../modules/Login.module.css";
import Button from "../Button";
import Input from "../Input";
import "../InitialFireBase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const Criar = () => {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState(null);
  const refButton = useRef();

  const handleSubmitCadastrar = (event) => {
    event.preventDefault();
    refButton.current.innerText = "Carregando...";
    createUserWithEmailAndPassword(auth, usuario, senha)
      .then(() => {
        // const user = userCredential.user;
      })
      .catch((error) => {
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

  return (
    <div className={`${styles.cadastroForm} animacaoLEFT`}>
      <h1 className="tituloPadrao">Cadastrar</h1>
      <form onSubmit={handleSubmitCadastrar}>
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
          nome="Cadastrar"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Criar;
