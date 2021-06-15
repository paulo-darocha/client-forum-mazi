import { useMutation } from "@apollo/client";
import React, { FC, useReducer, useState } from "react";
import ReactModal from "react-modal";
import PromptModal from "../../auxiliares/PromptModal";
import useAtualizaPerfil from "../../auxiliares/useAtualizaPerfil";
import useImgFromServer from "../../auxiliares/useImagemFromServer";
import { LoginMutation } from "../../graphql/graphqlMutation";
import { Perfil } from "../../graphql/graphqlQueries";
import { autorizaEnvio } from "./AutorizaEnvio";
import usuarioReducer from "./UsuarioReducer";

export interface LoginProps {
  aberto: boolean;
  onClickAlterna: (e: any) => void
}

const Login: FC<LoginProps> = ({ aberto, onClickAlterna }) => {
  const [execLogin] = useMutation(LoginMutation, {
    refetchQueries: [{ query: Perfil }]
  });

  const [
    { nome, senha, msgResultado, envioDesativado },
    localDispatch
  ] = useReducer(usuarioReducer, {
    nome: "usuario#",
    senha: "Test123!@#",
    msgResultado: "",
    envioDesativado: true
  });

  const { atualizaPerfil } = useAtualizaPerfil();
  const { getImgFromServer } = useImgFromServer();
  const [avisa, setAvisa] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const onChangeUsuario = (e: any) => {
    localDispatch({ type: "nome", payload: e.target.value });
    if (!e.target.value) {
      autorizaEnvio(localDispatch, "Por favor preencha campo 'Usuário'", true);
    } else {
      autorizaEnvio(localDispatch, "", false);
    }
  }

  const onChangeSenha = (e: any) => {
    localDispatch({ type: "senha", payload: e.target.value });
    if (!e.target.value) {
      autorizaEnvio(localDispatch, "Por favor preencha campo 'Senha'", true);
    } else {
      autorizaEnvio(localDispatch, "", false);
    }
  }

  const onClickLogin = async (e: any) => {
    //console.log("LOGIN.CLICK_LOGIN");
    e.preventDefault();
    onClickAlterna(e);

    const resposta = await execLogin({
      variables: {
        usuario: nome, senha
      }
    });
    if (resposta.data.login.aviso) {
      setMensagem(resposta.data.login.aviso)
      setAvisa(true);
    } else {
      //console.log("LOGIN EFETUADO COM SUCESSO");
      atualizaPerfil();
      getImgFromServer();
    }

    
  };

  const onClickCancelar = (e: any) => {
    onClickAlterna(e);
  };

  const onClickAlteraAviso = (e: any) => {
    setAvisa(!avisa);
    onClickAlterna(e);
  };

  return (
    <React.Fragment>
      <ReactModal
        className="modal-menu"
        isOpen={aberto}
        onRequestClose={onClickAlterna}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >

        <form>
          <div>
            <div>
              <label>Usuário</label>
              <input
                className="form-control mb-2"
                type="text"
                value={nome}
                onChange={onChangeUsuario}
              />
            </div>

            <div>
              <label>Senha</label>
              <input
                className="form-control mb-2"
                type="password"
                placeholder=""
                value={senha}
                onChange={onChangeSenha}
              />
            </div>
          </div>

          <div>
            <span>
              <strong>{msgResultado}</strong>
            </span>
            <div className="text-center">
              <button className="btn btn-primary m-2"
                onClick={onClickLogin}
                disabled={envioDesativado}
              >
                Login
              </button>
              <button className="btn btn-secondary m-2"
                onClick={onClickCancelar}
              >
                Fechar
              </button>
            </div>
          </div>
        </form>

      </ReactModal>
      <PromptModal 
        avisa={avisa}
        onClickAlterna={onClickAlteraAviso}
        mensagem={mensagem}
      />
    </React.Fragment>  
  );
}

export default Login;