import { faRegistered, faSignInAlt, faSignOutAlt, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ReduxType } from "../../reduxStore/ReduxType";
import ImagemPerfil from "../rotas/complementos/ImagemPerfil";
import Login from "./Login";
import Logout from "./Logout";
import Registro from "./Registro";


export const MenuRegistrar = () => {
  const perfil = useSelector((dataStore: ReduxType) => dataStore.perfil);
  const [abreRegistro, setAbreRegistro] = useState(false);

  const onClickAlternaRegistro = () => {
    //console.log("MENU_USUARIO.AlternaRegistro.value", abreRegistro);
    setAbreRegistro(!abreRegistro);
  }

  return (
    <React.Fragment>
      {perfil ? null : (
        <div className="px-2" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faRegistered} />
          <span className="ps-2" onClick={onClickAlternaRegistro}>
            Registrar
          </span>
          <Registro 
            aberto={abreRegistro}
            onClickAlterna={onClickAlternaRegistro}
          />
        </div>
      )}
    </React.Fragment>
  );
}


export const MenuLogin = () => {
  const perfil = useSelector((dataStore: ReduxType) => dataStore.perfil);
  const [abreLogin, setAbreLogin] = useState(false);

  const onClickAlternaLogin = () => {
    setAbreLogin(!abreLogin);
  }

  return (
    <React.Fragment>
      {perfil ? null : (
        <div className="px-2" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faSignInAlt} />
          <span className="ps-2" onClick={onClickAlternaLogin}>
            Login
          </span>
          <Login
            aberto={abreLogin}
            onClickAlterna={onClickAlternaLogin}
          />
        </div>
      )}
    </React.Fragment>
    
  );
};


export const PerfilAtual = () => {
  const perfil = useSelector((dataStore: ReduxType) => dataStore.perfil);
  const history = useHistory();

  const onClickPerfil = () => {
    history.push(`/perfilusuario/${perfil?.id}`)
  };

  return (
    <React.Fragment>
      {perfil ? (
        <div className="pe-3" onClick={onClickPerfil} 
          style={{ cursor: "pointer" }}
        >


          <span className="float-start">
            <ImagemPerfil altura="30"/>
          </span>
          {/* <FontAwesomeIcon icon={faUser}/> */}
          <span className="p-2">
            {perfil?.usuario || "USUÁRIO"}
          </span>


        </div>
      ) : null}
    </React.Fragment>
  );
};


export const MenuLogout = () => {
  const perfil = useSelector((dataStore: ReduxType) => dataStore.perfil);
  const [abreLogout, setAbreLogout] = useState(false);

  const onClickAlternaLogout = () => {
    setAbreLogout(!abreLogout);
  }

  return (
    <React.Fragment>
      {perfil ? (
        <li className="ps-3"  style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="ps-1" onClick={onClickAlternaLogout}>
            Logout
          </span>
          <Logout 
            aberto={abreLogout}
            onClickAlterna={onClickAlternaLogout}
          />
        </li>
      ) : null}
    </React.Fragment>
  );
};


export const ListaUsuarios = () => {

  return (
        <li className="ps-4 text-dark"  style={{ cursor: "pointer" }}>
          <Link to="/usuarios">
            <FontAwesomeIcon icon={faUsers} />
            <span className="ps-1">
              Usuários
            </span>
          </Link>
        </li>
  );
};