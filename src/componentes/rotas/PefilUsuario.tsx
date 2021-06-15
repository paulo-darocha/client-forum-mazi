import { useMutation } from "@apollo/client";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Imagens from "../../auxiliares/Imagens";
import { AlterarSenha } from "../../graphql/graphqlMutation";
import IResposta from "../../modelos/IResposta";
import ITopico from "../../modelos/ITopico";
import { ReduxType } from "../../reduxStore/ReduxType";
import ComparaSenha from "../acesso/complementos/ComparaSenha";
import usuarioReducer from "../acesso/UsuarioReducer";
import Superior from "../Superior";
import ImagemPerfil from "./complementos/ImagemPerfil";

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
          <li key={`top-${topico.id}`}>
            <Link to={`/topico/${topico.id}`}>
              {topico.titulo}
            </Link>
          </li>
        );
      });
      setTopicos(!perfil.topicos || perfil.topicos.length === 0
        ? undefined : (<ul>{topicos}</ul>));

      //console.log("PERFIL_USUARIO", perfil.usuario);
      const respostas = perfil.respostas?.map((resposta: IResposta) => {
        return (
          <li key={`top-${resposta.id}`}>
            <Link to={`/topico/${resposta.topico.id}`}>
              {resposta.texto.length <= 35 ? resposta.texto
                : resposta.texto.substring(0, 35) + " ..."}
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

  return (
    <div
      className="container"
      style={{ maxWidth: "800px" }}
    >
      <div className="superior" style={{ minHeight: "40px" }}>
        <Superior />
      </div>

      <form>
      <div className="py-2"
            onClick={onClickAlterna}
            style={{ cursor: "pointer" }}
          >
            <div className="float-end">
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
              className="btn btn-primary my-1"
              disabled={envioDesativado}
              onClick={onClickAlteraSenha}
            >
              Alterar Senha
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
            <label className="ms-3 my-1">
              {respostas}
            </label>
          </div>
        </div>
      </form>
    </div>
  );

};

export default PerfilUsuario