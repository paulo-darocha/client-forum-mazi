import { useMutation } from "@apollo/client";
import { faChevronDown, faChevronUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { AtualizaRespostaPonto } from "../graphql/graphqlMutation";
import useAtualizaPontoTopico from "./AtualizaTopicoPontos";
class PontosHorizontalProps {
  pontos: number = 0;
  topicoId?: string;
  respostaId?: string;
  permiteAtualizar?: boolean = false;
  atualizaTopico?: () => void;
}

const PontosHorizontal: FC<PontosHorizontalProps> = ({
  pontos,
  topicoId,
  respostaId,
  permiteAtualizar,
  atualizaTopico
}) => {

  const [execRespostaPonto] = useMutation(AtualizaRespostaPonto);
  const { onClickSomaPontoTop, onClickSubtraiPontoTop } =
    useAtualizaPontoTopico(atualizaTopico, topicoId);

  const onClickSomaPonto = async (e: any) => {
    e.preventDefault();
    await execRespostaPonto({
      variables: { respostaId, somaUm: true }
    });
    atualizaTopico && atualizaTopico();
  };

  const onClickSubtraiPonto = async (e: any) => {
    e.preventDefault();
    await execRespostaPonto({
      variables: { respostaId, somaUm: false }
    });
    atualizaTopico && atualizaTopico();
  };

  return (
    <span className="d-inline-flex">
      <div className="mx-3">
        <FontAwesomeIcon icon={faChevronUp}
          onClick={topicoId ? onClickSomaPontoTop : onClickSomaPonto}
        />
      </div>
      {pontos}
      <div className="mx-3">
        <FontAwesomeIcon icon={faChevronDown}
          onClick={topicoId ? onClickSubtraiPontoTop : onClickSubtraiPonto}
        />
      </div>
      <div className="mx-2 text-danger">
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </span>
  );
};

export default PontosHorizontal;