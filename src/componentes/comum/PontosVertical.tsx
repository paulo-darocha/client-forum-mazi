import { faChevronDown, faChevronUp, faHeart, faReplyAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import useAtualizaPontoTopico from "../../auxiliares/AtualizaTopicoPontos";

export class PontosVerticalProps {
  pontos: number = 0;
  numRespostas?: number;
  topicoId?: string;
  permiteAtualizar?: boolean = false;
  atualizaTopico?: () => void;
}

const PontosVertical: FC<PontosVerticalProps> = ({
  pontos,
  numRespostas,
  topicoId,
  permiteAtualizar,
  atualizaTopico
}) => {
  const { largura } = useLarguraTela();

  const { onClickSomaPontoTop, onClickSubtraiPontoTop } = 
    useAtualizaPontoTopico(atualizaTopico, topicoId);

  if (largura > 768) {
    return (
      <div className="flex-column text-center">
        <div>
          <div style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faChevronUp}
              className="mt-4"
              onClick={onClickSomaPontoTop}
            />
          </div>
          {pontos}
          <div style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faChevronDown}
              className="mb-1 mt-1"
              onClick={onClickSubtraiPontoTop}
            />
          </div>
          <FontAwesomeIcon icon={faHeart} 
            className="text-danger mb-4"
          />
        </div>
        <div className="mt-4">
          {numRespostas}
          <br />
          <FontAwesomeIcon icon={faReplyAll} />
        </div>
      </div>

    );
  }
  return null;
};

export default PontosVertical;