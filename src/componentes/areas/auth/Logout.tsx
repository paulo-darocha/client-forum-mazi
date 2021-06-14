import { useMutation } from "@apollo/client";
import { FC } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../dataStore/AppState";
import { LogoutMutation } from "../../../graphql/graphqlMutation";
import { Perfil } from "../../../graphql/graphqlQueries";
import useAtualizaPerfil from "../../../auxiliares/useAtualizaPerfil";
import { useHistory } from "react-router-dom";

export interface LogoutProps {
  aberto: boolean;
  onClickAlterna: (e: any) => void
}

const Logout: FC<LogoutProps> = ({
  aberto, onClickAlterna
}) => {
  const [execLogout] = useMutation(LogoutMutation, {
    refetchQueries: [{ query: Perfil }]
  });
  const { apagaPerfil } = useAtualizaPerfil();
  const perfil = useSelector((dataStore: AppState) => dataStore.perfil);
  const history = useHistory();

  const onClickLogout = async (e: any) => {
    //console.log("LOGOUT.CLICK_LOGOUT")
    e.preventDefault();
    onClickAlterna(e);
    await execLogout({
      variables: { usuario: perfil?.usuario ?? "" }
    });
    history.push("/");
  };

  const onClickCancela = (e: any) => {
    onClickAlterna(e);
  };

  return (
    <ReactModal
      className="modal-menu"
      isOpen={aberto}
      onRequestClose={onClickAlterna}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <form className="text-center">
        <h6 className="my-3">
          Are you sure you want to logout?
        </h6>
        <div>
          <div>
            <button className="btn btn-warning m-2" onClick={onClickLogout}>
              Logout
            </button>
            <button className="btn btn-secondary m-2" onClick={onClickCancela}>
              Fechar
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  );
};

export default Logout;