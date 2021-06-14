import { faEye, faHeart, faReplyAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLarguraTela } from "../../../auxiliares/useLarguraTela";
import Topico from "../../../modelos/ITopico";
import RichEditor from "../../editor/RichEditor";

interface TopicoCardProps {
  topico: Topico;
}

const TopicoCard: FC<TopicoCardProps> = ({ topico }) => {
  //console.log("TOPICO_CARDS.topico", topico);
  
  const { largura } = useLarguraTela();
  const history = useHistory();

  const onClickMostrarTopico = (e: any) => {
    history.push("/topico/" + topico.id);
  }

  const getPontosMobile = (topico: Topico) => {
    if (largura <= 768) {
      return (
        <label className="m-2 text-danger">
          {topico.pontos || 0}
          <FontAwesomeIcon icon={faHeart} className="mx-1"/>
        </label>
      );
    }
    return null;
  };

  const getRespostasMobile = (topico: Topico) => {
    if (largura <= 768) {
      return (
        <label className="m-2 text-primary">
          {topico && topico.respostas && topico.respostas.length}
          <FontAwesomeIcon icon={faReplyAll} className="mx-1" />
        </label>
      );
    }
    return null;
  };

  const getPontosDesktop = () => {
    if (largura > 768) {
      return (
        <div className="col-md-1 text-center">
          <div className="my-3">
            {topico.pontos || 0}
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="">
            {topico && topico.respostas && topico.respostas.length}
            <br />
            <FontAwesomeIcon icon={faReplyAll} />
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <section className="row mx-3 my-2 border border-dark bg-white">
      <div className="col-md-11 border-end border-dark">
        <div>
          <Link className=""
            to={`/topicosdacateg/${topico.categoria.id}`}
          >
            <strong>{topico.categoria.nome}</strong>
          </Link>
          
          <span className="m-3 h6">
            {topico.usuario.usuario}
          </span>
        </div>

        <div>
          <div onClick={onClickMostrarTopico}
            data-topico-id={topico.id}
          >
            <strong>{topico.titulo}</strong>
          </div>
          <div
            onClick={onClickMostrarTopico}
            data-topico-id={topico.id}
          >
            <div className="mb-1">
              <RichEditor existingBody={topico.texto} readOnly={true} />
            </div>
          </div>

          <div>
            <span className="text-success">
              <label className="m-1">
                {topico.views || 0}
                <FontAwesomeIcon icon={faEye} className="mx-2" />
              </label>
            </span>

            <span>
              {getPontosMobile(topico)}
              {getRespostasMobile(topico)}
            </span>
          </div>
        </div>
      </div>
      {getPontosDesktop()}
    </section>
  );

};

export default TopicoCard;