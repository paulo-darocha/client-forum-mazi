import { useMutation } from "@apollo/client";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Imagens from "../../auxiliares/Imagens";
import { AlterarSenha, ApagaUsuarioMutation } from "../../graphql/graphqlMutation";
import IResposta from "../../modelos/IResposta";
import ITopico from "../../modelos/ITopico";
import { ReduxType } from "../../reduxStore/ReduxType";
import ComparaSenha from "../acesso/complementos/ComparaSenha";
import usuarioReducer from "../acesso/UsuarioReducer";
import Superior from "../Superior";
import ImagemPerfil from "./complementos/ImagemPerfil";
import "../rotas/Topico.css";
import Usuarios from "../outrosUsuarios/Usuarios";
import Esquerdo from "../Esquerdo";
import Direito from "../direito/Direito";
import SlateEditor, { getTextFromNodes } from "../../slate-text-editor/SlateEditor";
import Resposta from "./complementos/Resposta";
import ReactModal from "react-modal";

const PerfilUsuario = () => {
  const perfil = useSelector((store: ReduxType) => store.perfil);
  //console.log("PERFIL_USUARIO", perfil?.usuario);
  const [
    { nome, senha, confirmaSenha, msgResultado, envioDesativado },
    dispatchLocal
  ] = useReducer(usuarioReducer, {
    nome: "",
    senha: "*******",
    confirmaSenha: "********",
    msgResultado: "",
    envioDesativado: true
  });

  const [topicos, setTopicos] = useState<JSX.Element | undefined>();
  const [respostas, setRespostas] = useState<JSX.Element | undefined>();
  const [execAlterarSenha] = useMutation(AlterarSenha);
  const [aberto, setAberto] = useState(false);
  const [aviso, setAviso] = useState(false);
  const [execApagaUsuario] = useMutation(ApagaUsuarioMutation);
  const history = useHistory();

  const onClickAlterna = () => {
    setAberto(!aberto);
  };

  useEffect(() => {
    if (perfil) {
      dispatchLocal({
        type: "nome",
        payload: perfil.usuario
      });

      const topicos = perfil.topicos?.map((topico: ITopico) => {
        return (
          <li key={`top-${topico.id}`}
            className="list-group-item m-2 border border-success rounded-1"
            style={{ marginLeft: "-50px", textDecoration: "none" }}
          >
            <Link to={`/topico/${topico.id}`} style={{ textDecoration: "none" }}>
              {topico.titulo}
            </Link>
          </li>
        );
      });
      setTopicos(!perfil.topicos || perfil.topicos.length === 0
        ? undefined : (<ul>{topicos}</ul>));

      //console.log("PERFIL_USUARIO", perfil.usuario);
      const respostas = perfil.respostas?.map((resposta: IResposta) => {
        console.log(resposta.texto)
        return (
          <li key={`top-${resposta.id}`} className="my-2">
            <Link to={`/topico/${resposta.topico.id}`}>
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
      setRespostas(!perfil.respostas || perfil.respostas.length === 0
        ? undefined : (<ul>{respostas}</ul>));

    } else {
      dispatchLocal({
        type: "nome",
        payload: ""
      });
      setTopicos(undefined);
      setRespostas(undefined);
    }
  }, [perfil]);

  const onClickAlteraSenha = async (e: any) => {
    e.preventDefault();
    const { data } = await execAlterarSenha({
      variables: { novaSenha: senha }
    });
    dispatchLocal({
      type: "msgResultado",
      payload: data ? data.alterarSenha : ""
    });
    //console.log("ALTERA_SENHA", msgResultado);
  };

  const onClickApagaPerfil = (e: any) => {
    e.preventDefault()
    setAviso(true);
  };

  const onClickConfirmaApaga = () => {
    setAviso(false);
  }

  return (

    <div
      className="App"
    // style={{ maxWidth: "800px" }}
    >
      <ReactModal
        className="modal-menu text-center"
        ariaHideApp={false}
        isOpen={aviso}
        shouldCloseOnOverlayClick={true}
      >
        <div>
          <div className="m-5">
            A função 'Apagar Perfil' não está implementada
          </div>
          <button className="mx-3 mb-3 btn btn-primary" style={{minWidth: "120px"}}
            onClick={onClickConfirmaApaga}
          >OK</button>
          <button className="mx-3 mb-3 btn btn-secondary" style={{minWidth: "120px"}}
            onClick={() => setAviso(false)}
          >Cancela</button>
        </div>
      </ReactModal>

      <div className="superior" style={{ minHeight: "4em" }}>
        <Superior />
      </div>
      <Usuarios />
      <Esquerdo />
      <Direito />

      <div className="central p-2">
        <form>
          <div className="py-2"
            onClick={onClickAlterna}
            style={{ cursor: "pointer" }}
          >
            <div className="float-end pb-2">
              <ImagemPerfil altura="150" />
            </div>

          </div>
          <div className="my-2">
            <strong className="h5">Perfil do Usuário:</strong>
            <label className="mx-2 h5">{nome}</label>
            <div><small>
              Clique na imagem para alterar a foto do perfil
            </small></div>


            <Imagens aberto={aberto}
              onClickAlterna={onClickAlterna} />
          </div>

          <div>
            <div>
              <span className="h6">Alterar Senha: </span>
              <ComparaSenha
                dispatch={dispatchLocal}
                senha={senha}
                confirmaSenha={confirmaSenha}
              />
              <button
                className="btn btn-primary m-1"
                disabled={envioDesativado}
                onClick={onClickAlteraSenha}
              >
                Alterar Senha
              </button>
              <button className="btn btn-warning float-end m-1"
                onClick={onClickApagaPerfil}
              >
                Apaga Perfil
              </button>
            </div>

            <div>
              <label>{msgResultado}</label>
            </div>
          </div>

          <div>
            <hr />
            <div>
              <div><strong>Tópicos Postados</strong></div>
              <label className="ms-3 my-1">
                {topicos}
              </label>
            </div>
            <div>
              <div><strong>Respostas Postadas</strong></div>
              <label className="mx-3 my-1">
                {respostas}
              </label>
            </div>
          </div>
        </form>
      </div>

    </div>
  );

};

export default PerfilUsuario