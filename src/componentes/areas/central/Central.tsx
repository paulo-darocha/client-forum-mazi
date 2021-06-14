import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GetTopicosPorCategoria, GetTopicosRecentes } from "../../../graphql/graphqlQueries";
import Categoria from "../../../modelos/ICategoria";
import ITopico from "../../../modelos/ITopico";
import CategoriaAtiva from "./CategoriaAtiva";
import TopicoCard from "./TopicoCard";

const Central = () => {
  const [
    execGetTopicosPorCat,
    {
      // error: topicosPorCatErro,
      // called: topicosPorCatCalled,
      data: topicosPorCatData
    }
  ] = useLazyQuery(GetTopicosPorCategoria);
  const [
    execTopicosRecentes,
    {
      // error: topicosRecentesError,
      // called: topicosRecentesCalled,
      data: topicosRecentesData
    }
  ] = useLazyQuery(GetTopicosRecentes);

  const { catId }: any = useParams();
  const [categoria, setCategoria] = useState<Categoria | undefined>();
  const [topicoCards, setTopicoCards] = useState<Array<JSX.Element> | null>(null);
  const history = useHistory();

  useEffect(() => {
    //console.log("CAT_ID", catId);
    if (catId && catId > 0) {
      execGetTopicosPorCat({
        variables: { categoriaId: catId }
      });
    } else {
      execTopicosRecentes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId]);

  useEffect(() => {
    if (topicosPorCatData && topicosPorCatData.getTopicosPorCategoria 
      && topicosPorCatData.getTopicosPorCategoria.topicos) {
        const topicos = topicosPorCatData.getTopicosPorCategoria.topicos;
        const cards = topicos.map((topico: ITopico) => {
          return <TopicoCard key={`top-${topico.id}`} topico={topico} />;
        });
        setCategoria(topicos[0].categoria);
        setTopicoCards(cards);
      } else {
        setCategoria(undefined);
        setTopicoCards(null);
      }
  }, [topicosPorCatData]);

  useEffect(() => {
    //console.log("TOPICOS_RECENTES", topicosRecentesData)
    if (topicosRecentesData && topicosRecentesData.getTopicosRecentes
      && topicosRecentesData.getTopicosRecentes.topicos) {
        const topicos = topicosRecentesData.getTopicosRecentes.topicos;
        const cards = topicos.map((topico: ITopico) => {
          return <TopicoCard key={`top-${topico.id}`} topico={topico} />;
        });
        setCategoria(new Categoria("0", "Recentes"));
        setTopicoCards(cards);
      }
  }, [topicosRecentesData]);

  const onClickPostTopico = () => {
    history.push("/topico");
  };

  return (
    <main className="central">
      <button className="btn btn-primary m-3 py-1 h-4"
        onClick={onClickPostTopico}
      >
        Criar Novo Tópico
      </button>
      <CategoriaAtiva categoria={categoria} />
      <div>{topicoCards}</div>
    </main>
  );
};

export default Central;