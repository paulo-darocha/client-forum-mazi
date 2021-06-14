import { FC, useEffect, useState } from "react";
import IResposta from "../../../modelos/IResposta";
import Resposta from "./Resposta";

interface RespostasCardProps {
  respostas?: Array<IResposta>;
  readOnly: boolean;
  atualizaTopico?: () => void;
}

const RespostasCard: FC<RespostasCardProps> = ({ 
  respostas, 
  readOnly,
  atualizaTopico 
}) => {
  const [elemRespostas, setElemRespostas] = useState<JSX.Element | undefined>();

  //console.log("RESPOSTA_CARD.respostas", respostas);

  useEffect(() => {
    if (respostas) {
      const resultado = respostas.map((resp) => {
        return (
          <li key={`resp-${resp.id}`}>
            <Resposta
              texto={resp.texto}
              usuario={resp.usuario.usuario}
              modificadoEm={resp.criadoEm}
              pontos={resp.pontos}
              readOnly={readOnly}
              respostaId={resp.id || "0"}
              topicoId={resp.topico.id}
              atualizaTopico={atualizaTopico}
            />
          </li>
        );
      })
      setElemRespostas(<ul>{resultado}</ul>)
    }
  }, [respostas, readOnly]);

  return (
    <div className="my-2">
      <strong className="ms-2">
        Respostas
      </strong>
      {elemRespostas}
    </div>
  );


};

export default RespostasCard;