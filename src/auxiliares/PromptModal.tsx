import { FC } from "react";
import ReactModal from "react-modal";

interface SucessoRegistroProps {
  avisa: boolean;
  onClickAlterna: (e: any) => void;
  mensagem: string;
}

const PromptModal: FC<SucessoRegistroProps> = ({
  avisa, onClickAlterna, mensagem
}) => {
  return (
    <ReactModal
      className="modal-menu text-center"
      ariaHideApp={false}
      isOpen={avisa}
      onRequestClose={onClickAlterna}
      shouldCloseOnOverlayClick={true}
    >
      <div className="m-5 h6">{mensagem}</div>
      <button className="btn btn-primary mb-4"
        style={{minWidth: "100px"}}
        onClick={onClickAlterna}
      >
        Ok
      </button>
    </ReactModal>
  );
};

export default PromptModal;