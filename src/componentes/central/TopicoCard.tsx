import { faEye, faHeart, faReplyAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import ITopico from "../../modelos/ITopico";
import SlateEditor from "../../slate-text-editor/SlateEditor";

interface TopicoCardProps {
  topico: ITopico;
}

const TopicoCard: FC<TopicoCardProps> = ({ topico }) => {
  //console.log("TOPICO_CARDS.topico", topico);
  
  const { largura } = useLarguraTela();
  const history = useHistory();

  const onClickMostrarTopico = (e: any) => {
    history.push("/topico/" + topico.id);
  }

  const getPontosMobile = (topico: ITopico) => {
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

  const getRespostasMobile = (topico: ITopico) => {
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
    console.log(topico)
    if (largura > 768) {
      return (
        <div className="col-md-1 d-flex flex-column justify-content-between align-items-center">
          <div className="my-3 text-center">
            {topico.pontos || 0}
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="my-3 text-center">
            {topico && topico.respostas && topico.respostas.length}
            <br />
            <FontAwesomeIcon icon={faReplyAll} />
          </div>
        </div>
      );
    }
    return null;
  }

  const data = () => {
    let data = topico.criadoEm.toString();
    return data.substring(0, 10);
  }

  return (
    <section className="row mx-3 my-2 border border-dark bg-white">
      <div className="col-md-11 border-end border-dark">
        <div>
          <div onClick={onClickMostrarTopico}
            data-topico-id={topico.id} className="h5 mt-2"
          >
            <strong>{topico.titulo}</strong>
          </div>

        </div>

        <div>
         
          <div
            onClick={onClickMostrarTopico}
            data-topico-id={topico.id}
          >
            <div className="mb-1" style={{cursor: "pointer"}}>
              <SlateEditor existingBody={topico.texto} readOnly={true} />
            </div>
          </div>
          <div>
            <span className="mx-1 h6">
              Criado por <span style={{fontSize: "1.1em"}}>
                {topico.usuario.usuario}
              </span> em {data()}
            </span>
          </div>

          <div>
            <span className="text-success">
              <label className="m-2">
                {topico.views || 0}
                <FontAwesomeIcon icon={faEye} className="mx-2" />
              </label>
              <Link className="m-1"
                to={`/topicosdacateg/${topico.categoria.id}`}
              >
                <strong>{topico.categoria.nome}</strong>
              </Link>
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