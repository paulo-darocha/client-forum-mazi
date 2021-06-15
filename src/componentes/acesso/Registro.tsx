import { useMutation } from "@apollo/client";
import React, { FC, useReducer, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import Imagens from "../../auxiliares/Imagens";
import PromptModal from "../../auxiliares/PromptModal";
import { ApagaUsuarioMutation, RegistroMutation } from "../../graphql/graphqlMutation";
import { TipoImagem } from "../../reduxStore/ImagemReducer";
import ImagemPerfil from "../rotas/complementos/ImagemPerfil";
import { autorizaEnvio } from "./AutorizaEnvio";
import ComparaSenha from "./complementos/ComparaSenha";
import usuarioReducer from "./UsuarioReducer";

export interface RegistroProps {
  aberto: boolean;
  onClickAlterna: (e: any) => void
}

const Registro: FC<RegistroProps> = ({ aberto, onClickAlterna }) => {

  const [execRegistro] = useMutation(RegistroMutation);
  const [execApagaUsuario] = useMutation(ApagaUsuarioMutation)
  const [mostraImg, setMostraImg] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  const [novoUsuarioId, setNovoUsuarioId] = useState("");
  const [avisa, setAvisa] = useState(false);
  const reduxDispatch = useDispatch();

  const [
    { nome, senha, email, confirmaSenha, msgResultado, envioDesativado },
    dispatch
  ] = useReducer(usuarioReducer, {
    nome: "Valdek",
    senha: "Test123!@#",
    email: "valdek@test.com",
    confirmaSenha: "Test123!@#",
    msgResultado: "",
    envioDesativado: true
  });

  const onChangeUsuario = (e: any) => {
    dispatch({ type: "nome", payload: e.target.value })
    if (!e.target.value) {
      autorizaEnvio(dispatch, "Campo 'usuário' não pode ficar em branco", true);
    } else if (senha && email && confirmaSenha) {

      autorizaEnvio(dispatch, "", false)
    }
  };

  const onChangeEmail = (e: any) => {
    dispatch({ type: "email", payload: e.target.value });
    if (!e.target.value) {
      autorizaEnvio(dispatch, "Campo 'email' não pode ficar em branco", true)
    } else if (nome && email && confirmaSenha) {
      autorizaEnvio(dispatch, "", false);
    }
  };


  const onClickNext = async (e: any) => {
    e.preventDefault();
    const resposta = await execRegistro({
      variables: {
        email,
        usuario: nome,
        senha
      }
    });
    //console.log(resposta.data.registro.aviso);
    if (resposta.data.registro.id) {

      //console.log("REGISTRADO");
      setNovoUsuarioId(resposta.data.registro.id)
      onClickAlterna(e);
      setMostraImg(true);
    } else {
      dispatch({
        type: "msgResultado",
        payload: resposta.data.registro.aviso
      })
    }
  };


  const onClickCancelar = (e: any) => {
    // APAGA REGISTRO
    onClickAlterna(e);
    dispatch({
      type: "reset",
      payload: null
    })
    dispatch({
      type: "envioDesativado",
      payload: true
    })
    if (novoUsuarioId && registrado) {
      //console.log("NOVO_USUARIO", novoUsuarioId);
      ApagaUsuario(novoUsuarioId);
    }
    setNovoUsuarioId("");
    reduxDispatch({ type: TipoImagem, payload: null });
  }

  const onClickAlternaImg = (e: any) => {
    setMostraImg(!mostraImg);
    setRegistrado(true);
    onClickAlterna(e);
    reduxDispatch({ type: TipoImagem, payload: null });
  }

  const onClickProsseguir = (e: any) => {
    onClickAlterna(e);
    setRegistrado(true);
  };

  const onClickFinalizar = (e: any) => {
    if (novoUsuarioId) setAvisa(true);
    onClickAlterna(e);
  }

  const onClickAlternaAviso = () => {
    setAvisa(!avisa);
  }

  const ApagaUsuario = (id: string) => {
    execApagaUsuario({
      variables: { usuarioId: id }
    });
  };

  const mudaImagem = (e: any) => {
    setMostraImg(true);
    onClickAlterna(e);
  };

  return (
    <React.Fragment>

      <ReactModal
        className="modal-menu"
        ariaHideApp={false}
        isOpen={aberto}
        onRequestClose={onClickCancelar}
        shouldCloseOnOverlayClick={false}
        onAfterClose={() => setRegistrado(false)}
      >

        <form>
          {novoUsuarioId ? (<div className="m-2 float-end"
            onClick={mudaImagem}
          >
            <ImagemPerfil altura="80" />
            <small className="float-start mx-2">
              Clique na imagem para alterar
            </small>
          </div>) : null}
          <div>
            <div>
              <label style={{ fontSize: "1.1em" }}>Usuário:</label>
              <input
                className="form-control mb-2"
                type="text" value={nome}
                onChange={onChangeUsuario}
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                className="form-control mb-2"
                type="text" value={email}
                onChange={onChangeEmail}
              />
            </div>

            <div>
              <ComparaSenha
                dispatch={dispatch}
                senha={senha}
                confirmaSenha={confirmaSenha}
              />
            </div>

          </div>

          <span className="text-danger">
            <strong>{msgResultado}</strong>
          </span>

          <div className="">
            <div className="text-center">
              {registrado ? (<button className="btn btn-primary m-3"
                onClick={onClickFinalizar}
                disabled={envioDesativado}
              >
                Finalizar Registro
              </button>) : null}
              <button className="btn btn-secondary m-3"
                onClick={onClickCancelar}
              >
                Cancelar Registro
              </button>
              {registrado ? null : (<button
                className="btn btn-primary m-3"
                onClick={onClickNext}
                disabled={envioDesativado}
              >
                Prosseguir
              </button>)}
            </div>
          </div>
        </form>
      </ReactModal>

      <div className="card border">
        <Imagens aberto={mostraImg}
          onClickAlterna={onClickAlternaImg}
          cancelaTexto="Prosseguir Sem Imagem"
          onClickProsseguir={onClickProsseguir}
          novoUsuarioId={novoUsuarioId}
        />
      </div>

      <PromptModal
        avisa={avisa}
        onClickAlterna={onClickAlternaAviso}
        mensagem="Usuário criado com sucesso!"
      />
    </React.Fragment>
  );

};

export default Registro;