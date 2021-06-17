
import { FC, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import IResposta from "../../modelos/IResposta";
import ITopico from "../../modelos/ITopico";
import IUsuario from "../../modelos/IUsuario";
import SlateEditor from "../../slate-text-editor/SlateEditor";
import ImagemPerfil from "../rotas/complementos/ImagemPerfil";
import { RespostaImagem } from "./Membros";

interface PerfilMembrosProps {
  aberto: boolean;
  onClickFechar: (e: any) => void;
  usuario: IUsuario;
  foto: RespostaImagem;
}

const PerfilMembros: FC<PerfilMembrosProps> = ({
  aberto, usuario, onClickFechar, foto
}) => {

  const [topicos, setTopicos] = useState<JSX.Element | undefined>();
  const [respostas, setRespostas] = useState<JSX.Element | undefined>();
  const { largura } = useLarguraTela();

  useEffect(() => {
    if (usuario && usuario.id) {

      const topicos = usuario.topicos?.map((topico: ITopico) => {
        return (
          <li key={`top-${topico.id}`}
            className="list-group-item m-2 border border-success rounded-1"
            style={{ marginLeft: "-50px", textDecoration: "none" }}
          >
            <Link to={`/topico/${topico.id}`}
              onClick={onClickFechar} style={{ textDecoration: "none" }}
            >
              {topico.titulo}
            </Link>
          </li>
        );
      });
      setTopicos(!usuario.topicos || usuario.topicos.length === 0
        ? undefined : (<ul>{topicos}</ul>));

      //console.log("PERFIL_USUARIO", usuario.usuario);
      const respostas = usuario.respostas?.map((resposta: IResposta) => {
        return (
          <li key={`top-${resposta.id}`} className="my-2">
            <Link to={`/topico/${resposta.topico.id}`}
              onClick={onClickFechar}
            >
              <small>
                <SlateEditor
                  existingBody={resposta.texto}
                  readOnly={true}
                />
              </small>
            </Link>
          </li>
        );
      });
      setRespostas(!usuario.respostas || usuario.respostas.length === 0
        ? undefined : (<ul>{respostas}</ul>));

    } else {
      setTopicos(undefined);
      setRespostas(undefined);
    }
  }, [usuario]);

  const data = () => {
    let data = usuario.criadoEm.toLocaleString();
    return data.substring(0, 10);
  }

  return (
    <ReactModal
      closeTimeoutMS={200}
      className="modal-menu"
      isOpen={aberto}
      onRequestClose={onClickFechar}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >

      <div
        className="container"
      >
        <form>
          <div className="row">
            <div className="my-2 col-9">
              <strong className="h5">Perfil do Usuário:</strong>
              <br />
              <label className="h5">{usuario.usuario}</label>

              <div>membro desde {data()}</div>
            </div>
            <div className="py-2 col-3">
              <div className="float-end">
                <img src={foto.imgBlobURL} alt="imagem" width={largura/6} />
              </div>
            </div>
          </div>

          <div>
            <hr />
            <div>
              <div><strong>Tópicos Postados</strong></div>
              <label className="card">
                {topicos}
              </label>
            </div>
            <div>
              <div><strong>Respostas Postadas</strong></div>
              <label className="ms-3 my-1">
                {respostas}
              </label>
            </div>
          </div>
        </form>
        <div className="mb-3 text-center">
          <button className="btn btn-success text-end"
            onClick={onClickFechar}
          >
            Fechar
          </button>
        </div>
      </div>

    </ReactModal>
  );

};

export default PerfilMembros;