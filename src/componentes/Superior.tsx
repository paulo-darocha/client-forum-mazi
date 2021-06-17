import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";
import { useLarguraTela } from "../auxiliares/useLarguraTela";
import { ListaUsuarios, MenuLogin, MenuLogout, MenuRegistrar, PerfilAtual } from "./acesso/MenuUsuario";

const Superior = () => {
  const [abreMenu, setAbreMenu] = useState(false);
  const { largura } = useLarguraTela();
  const history = useHistory();

  const mobileMenu = () => {
    if (largura <= 576) {
      return (
        <FontAwesomeIcon
          onClick={onClickAlterna}
          icon={faBars} size="2x"
          className="float-end me-3 my-2"
          style={{ cursor: "pointer" }}
        />
      );
    }
    return null;
  }

  // incluir tipo do evento => e: ...
  const onClickAlterna = () => {
    setAbreMenu(!abreMenu);
  }

  const onClickFechar = () => {
    setAbreMenu(false);
  }

  const onClickSuperior = () => {
    history.push("/");
  }

  return (
    <React.Fragment>
      <ReactModal
        className="modal-menu ps-3"
        isOpen={abreMenu}
        onRequestClose={onClickFechar}
        shouldCloseOnOverlayClick={true}
      >
        <div className="ms-1 my-3"><MenuLogin /></div>
        <div className="ms-1 my-3"><MenuRegistrar /></div>
        <div className="ms-1 my-3"><PerfilAtual /></div>
        <div className="ms-1 my-3"><MenuLogout /></div>
        <div className="ms-1 my-3"><ListaUsuarios /></div>
      </ReactModal>

      <nav>
        { largura > 576 ? (
        <label className="float-end mx-2">
          <div className="d-inline-flex mx-2">
            <span className="my-2"><PerfilAtual /></span>
            <span className="my-2"><MenuLogout /></span>
          </div>
          <div className="d-inline-flex mx-2">
            <span className="my-2"><MenuLogin /></span>
            <span className="my-2"><MenuRegistrar /></span>
          </div>
        </label>
      ) : null}

        {mobileMenu()}
      <div className="float-start ms-3 mt-2 d-flex flex-column menuIn" 
        onClick={onClickSuperior} style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faHome} size="lg" className="ms-1" />
        <small>home</small>
      </div>
      <label 
        className="h5 ms-4 mt-2 float-start"
      >
        <strong>FORUM REACT-JS</strong>
      </label>
    </nav>

    </React.Fragment >
  )

}
export default Superior;