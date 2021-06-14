import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";
import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import { ListaUsuarios, MenuLogin, MenuLogout, MenuRegistrar, PerfilAtual } from "./auth/MenuUsuario";
import Membros from "./outrosUsuarios/Membros";

const Superior = () => {
  const [abreMenu, setAbreMenu] = useState(false);
  const { largura } = useLarguraTela();
  const history = useHistory();

  const mobileMenu = () => {
    if (largura <= 576) {
      return (
        <FontAwesomeIcon
          onClick={onClickAlterna}
          icon={faBars} size="lg"
          className="float-start mx-2"
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
        className="modal-menu"
        isOpen={abreMenu}
        onRequestClose={onClickFechar}
        shouldCloseOnOverlayClick={true}
      >
        <span className="m-2"><MenuLogin /></span>
        <span className="m-2"><MenuRegistrar /></span>
        <span className="m-2"><PerfilAtual /></span>
        <span className="m-2"><MenuLogout /></span>
        <span className="m-2"><ListaUsuarios /></span>
      </ReactModal>

      <nav>
        { largura > 576 ? (
        <label className="float-end mx-2">
          <div className="d-inline-flex mx-2">
            <span className="my-0"><PerfilAtual /></span>
            <span className="my-1"><MenuLogout /></span>
          </div>
          <div className="d-inline-flex mx-2">
            <span className="my-1"><MenuLogin /></span>
            <span className="my-1"><MenuRegistrar /></span>
          </div>
        </label>
      ) : null}

        {mobileMenu()}

      <label 
        className="h5 mt-1"
        onClick={onClickSuperior} 
        style={{ cursor: "pointer" }}
      >
        <span className="float-start" >
          <FontAwesomeIcon icon={faHome} />
        </span>
        <strong className="ms-3">FORUM REACT-JS</strong>
      </label>
    </nav>

    </React.Fragment >
  )

}
export default Superior;