import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLarguraTela } from "../auxiliares/useLarguraTela";
import { GetCategorias } from "../graphql/graphqlQueries";
import ICategoria from "../modelos/ICategoria";

const Esquerdo = () => {
  const { loading, error, data } = useQuery(GetCategorias);

  const { largura } = useLarguraTela();
  const [categorias, setCategorias] = useState<JSX.Element>(
    <div>ESQUERDO</div>
  );

  useEffect(() => {
    if (loading) {
      setCategorias(<span>Carregando...</span>);
    } else if (error) {
      setCategorias(<span>Um erro ocorreu ao carregar as Categorias...</span>)
    } else {
      if (data && data.getCategorias) {
        const categorias = data.getCategorias.map((cat: ICategoria) => {
          return <li className="h6 py-1" key={cat.id}>
            <Link to={`/topicosdacateg/${cat.id}`}>
              {cat.nome}
            </Link>
          </li>
        });
        setCategorias(<ul className="m-2">{categorias}</ul>)
      }
    }
  }, [data]);

  if (largura <= 576) {
    return null;
  }
  return <h6 className="esquerdo pt-2">{categorias}</h6>
}
export default Esquerdo;