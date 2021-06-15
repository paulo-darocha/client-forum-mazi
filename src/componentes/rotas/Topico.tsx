import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RespostasCard from "./complementos/RespostasCard";
import TopicoCategoria from "./complementos/TopicoCategoria";
import TopicoNome from "./complementos/TopicoNome";
import TopicoTexto from "./complementos/TopicoTexto";
import TopicoTitulo from "./complementos/TopicoTitulo";
import "./Topico.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GetTopicoPorId } from "../../graphql/graphqlQueries";
import ITopico from "../../modelos/ITopico";
import { useSelector } from "react-redux";
import { CriarTopico } from "../../graphql/graphqlMutation";
import ICategoria from "../../modelos/ICategoria";
import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import { Node } from "slate";
import Resposta from "./complementos/Resposta";
import { getTextFromNodes } from "../../slate-text-editor/SlateEditor";
import Superior from "../Superior";
import Usuarios from "../outrosUsuarios/Usuarios";
import PontosHorizontal from "../../auxiliares/PontosHorizontal";
import PontosVertical from "../../auxiliares/PontosVertical";
import { ReduxType } from "../../reduxStore/ReduxType";


const topicoReducer = (dataStore: any, action: any) => {
  //console.log("TOPICO.REDUCER", dataStore);
  switch (action.type) {

    case "usuarioId":
      return { ...dataStore, usuarioId: action.payload };

    case "categoria":
      return { ...dataStore, categoria: action.payload };

    case "titulo":
      return { ...dataStore, titulo: action.payload };

    case "texto":
      return { ...dataStore, texto: action.payload };

    case "textoNode":
      return { ...dataStore, textoNode: action.payload };

    default:
      return "Erro: action.type desconhecida";
  }
}


const Topico = () => {
  const [execTopicoPorId, { data: dadosTopico }] =
    useLazyQuery(GetTopicoPorId, { fetchPolicy: "no-cache" });

  const { largura } = useLarguraTela();
  const [topico, setTopico] = useState<ITopico | undefined>();
  const [readOnly, setReadOnly] = useState(false);
  const { id }: any = useParams();
  const perfil = useSelector((dataStore: ReduxType) => dataStore.perfil);

  //console.log("TOPICO.PERFIL", perfil);
  const [
    { usuarioId, categoria, titulo, textoNode },
    localReducer
  ] = useReducer(topicoReducer, {
    usuarioId: perfil?.id ? perfil.id : "0",
    categoria: undefined,
    titulo: "",
    texto: "",
    textoNode: undefined
  });


  const [postMsg, setPostMsg] = useState("");
  const [execCriaTopico] = useMutation(CriarTopico);
  const history = useHistory();

  const atualizaTopico = () => {
    if (id && id > 0) {
      execTopicoPorId({ variables: { id } });
    }
  }

  useEffect(() => {
    //console.log("TOPICO.id", id);
    if (id && id > 0) {
      execTopicoPorId({
        variables: { id }
      })
    }
  }, [id, execTopicoPorId]);

  useEffect(() => {
    localReducer({
      type: "usuarioId",
      payload: perfil ? perfil.id : "0"
    });
  }, [perfil?.id]);

  useEffect(() => {
    //console.log("TOPICO.dadosTopico", dadosTopico);
    if (dadosTopico && dadosTopico.getTopicoPorId) {
      setTopico(dadosTopico.getTopicoPorId);
      setReadOnly(true);
    } else {
      setTopico(undefined);
      setReadOnly(false);
    }
  }, [dadosTopico]);

  const recebeCategoriaSelecionada = (cat: ICategoria) => {
    localReducer({
      type: "categoria",
      payload: cat
    });
  };

  const recebeTitulo = (titulo: string) => {
    localReducer({
      type: "titulo",
      payload: titulo
    });
  };

  const recebeTexto = (texto: Node[]) => {
    localReducer({
      type: "textoNode",
      payload: texto
    });
    localReducer({
      type: "texto",
      payload: getTextFromNodes(texto)
    });
  };

  const onClickEnviar = async (e: any) => {
    e.preventDefault();
    if (!usuarioId || usuarioId === "0") {
      //console.log("TOPICO.USUARIO_ID", usuarioId);
      setPostMsg("Você precisa efetuar login para postar.");
    } else if (!categoria) {
      setPostMsg("Por favor selecione uma categoria para seu texto.");
    } else if (!titulo) {
      setPostMsg("Por favor insira um título.");
    } else if (!textoNode) {
      setPostMsg("Por favor insira um texto");
    } else {
      setPostMsg("");
      const novoTopico = {
        usuarioId,
        categoriaId: categoria.id,
        titulo,
        texto: JSON.stringify(textoNode)
      }
      const { data: criaTopicoMsg } = await execCriaTopico({
        variables: novoTopico,
      });

      if (criaTopicoMsg && !isNaN(criaTopicoMsg.criarTopico.aviso)) {
        setPostMsg("Topico criado com sucesso!");
        history.push(`/topico/${criaTopicoMsg.criarTopico.aviso}`)
      } else {
        //console.log("TOPICO.POST.AVISO", criaTopicoMsg.aviso);
        setPostMsg(criaTopicoMsg.criarTopico.aviso);
      }
    }
  };

  //console.log("TOPICO.respostas", topico?.respostas);

  return (
    <div className="Topico">


      <div className="superior">
        <Superior />
      </div>


      <div className="usuario">
        <Usuarios />
      </div>

      <div className=" central container-fluid">
        <div className="row mt-2 mx-1">

          <div className="col-md-11">
            {largura <= 768 && topico ? (
              <PontosHorizontal
                pontos={topico.pontos || 0}
                topicoId={topico.id}
                atualizaTopico={atualizaTopico}
                permiteAtualizar={true}
              />
            ) : null}

            <TopicoNome
              usuario={topico?.usuario ? topico.usuario.usuario : perfil?.usuario}
              modificadoEm={topico?.modificadoEm ? topico.modificadoEm : new Date()}
              titulo={topico ? topico.titulo : titulo}
            />
            <TopicoCategoria 
              categoria={topico?.categoria ? topico.categoria : categoria}
              enviaCategoriaSelecionada={recebeCategoriaSelecionada}
            />
            <TopicoTitulo
              titulo={topico?.titulo ? topico.titulo : ""}
              readOnly={topico ? readOnly : false}
              enviaTitulo={recebeTitulo}
            />  
            <TopicoTexto
              texto={topico?.texto ? topico.texto : ""}
              readOnly={topico ? readOnly : false}
              enviaTexto={recebeTexto}
            />
            {topico ? null : (
              <React.Fragment>
                <div>
                  <button 
                    className="btn btn-primary float-end m-1"
                    onClick={onClickEnviar}
                  >
                    Enviar
                  </button>
                </div>
                <strong>{postMsg}</strong>
              </React.Fragment>
            )}
          </div>

          <div className="col-md-1 border border-dark bg-white my-2">
            <PontosVertical
              pontos={topico?.pontos || 0}
              numRespostas={(topico && topico.respostas && topico.respostas.length) || 0} 
              topicoId={topico?.id || "0"}
              permiteAtualizar={true}
              atualizaTopico={atualizaTopico}
            />
          </div>
        </div>

        <div className="row">
          {topico ? (
            <div>
              <hr />
              <div>
                <RespostasCard 
                  respostas={topico?.respostas}
                  readOnly={readOnly}
                  atualizaTopico={atualizaTopico}
                />
              </div>
            </div>
          ) : null}

          {topico ? (
            <div>
              <hr />
              <div>
                <strong>Respostas</strong>
              </div>
              <div>
                <Resposta
                  texto={""}
                  usuario={perfil?.usuario}
                  modificadoEm={new Date()}
                  pontos={0}
                  readOnly={false}
                  respostaId={"0"}
                  topicoId={topico.id}
                  atualizaTopico={atualizaTopico}
                />
              </div>
            </div>
          ) : null}

        </div>
      </div>


    </div>
  );
};

export default Topico;
