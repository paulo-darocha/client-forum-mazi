import { useMutation } from "@apollo/client";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CriarResposta } from "../../../graphql/graphqlMutation";
import UsuarioEData from "./UsuarioEData";
import { Node } from "slate";
import { ReduxType } from "../../../reduxStore/ReduxType";
import PontosHorizontal from "../../../auxiliares/PontosHorizontal";
import SlateEditor from "../../../slate-text-editor/SlateEditor";

interface RespostaProps {
  texto?: string;
  usuario?: string;
  modificadoEm?: Date;
  pontos: number;
  readOnly: boolean;
  respostaId: string;
  topicoId?: string;
  atualizaTopico?: () => void;
}

const Resposta: FC<RespostaProps> = ({
  texto,
  usuario,
  modificadoEm,
  pontos,
  readOnly,
  respostaId,
  topicoId,
  atualizaTopico,
}) => {

  const perfil = useSelector((dataStore: ReduxType) => dataStore.perfil);
  const [execCriaResposta] = useMutation(CriarResposta);
  const [aviso, setAviso] = useState("");
  const [auxTexto, setAuxTexto] = useState("");

  useEffect(() => {
    if (texto) {
      setAuxTexto(texto || "");
    }
  }, [texto]);
  
  const onClickPostar = async (e: any) => {
    e.preventDefault();

    if (!perfil?.id) {
      setAviso("Você precisa efetuar login para postar uma resposta");
    } else if (!topicoId) {
      setAviso("Respostas só podem ser adicionadas a tópicos existentes.");
    } else if (!auxTexto) {
      setAviso("Por favor insira texto para a resposta");
    } else {
      await execCriaResposta({
        variables: {
          usuarioId: perfil.id ?? "0",
          topicoId,
          texto: auxTexto
        }
      });
      atualizaTopico && atualizaTopico();
    }
  };

  const recebeTexto = (texto: Node[]) => {
    const novoTexto = JSON.stringify(texto);
    if (auxTexto !== novoTexto) {
      setAuxTexto(novoTexto);
    }
  };

  return (
    <div className="ms-5 my-3">
      <div>
        <UsuarioEData usuario={usuario!} modificadoEm={modificadoEm} />
        <span className="mx-3">{respostaId} respostas</span>
        {readOnly ? (
          <span className="mx-3">
            <PontosHorizontal 
              pontos={pontos || 0} 
              respostaId={respostaId}
              atualizaTopico={atualizaTopico}
              permiteAtualizar={true}
            />
          </span>
        ) : null}
      </div>
      <div className="border border-success rounded-1 p-2 mb-2 bg-white">
        <SlateEditor 
          existingBody={auxTexto} 
          readOnly={readOnly} 
          sendOutBody={recebeTexto}
        />
      </div>

      {!readOnly && topicoId ? (
        <React.Fragment>
          <div>
            <button
              onClick={onClickPostar}
            >
              Postar Resposta
            </button>
          </div>
          <strong>{aviso}</strong>
        </React.Fragment>
      ) : null}
      
    </div>
  );
};

export default Resposta;