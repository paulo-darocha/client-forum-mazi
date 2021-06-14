import { useQuery } from "@apollo/client";
import groupBy from "lodash/groupBy";
import { useEffect, useState } from "react";
import { useLarguraTela } from "../../../auxiliares/useLarguraTela";
import { GetTopCategoriaTopico } from "../../../graphql/graphqlQueries";
import CategoriaTop from "./CategoriaTop";

const Direito = () => {
  const { data: gqlData } = useQuery(GetTopCategoriaTopico);
  const { largura } = useLarguraTela();
  const [categoriasTop, setCategoriasTop] = useState<Array<JSX.Element> | undefined>()

  useEffect(() => {
    if (gqlData && gqlData.getTopCategoriaTopico) {
      const topCategorias = groupBy(
        gqlData.getTopCategoriaTopico, "categoriaNome");

      const topGrupos = [];
      for (let key in topCategorias) {
        const atual = topCategorias[key];
        topGrupos.push(<CategoriaTop key={key} categoriasTop={atual} />);
      }
      setCategoriasTop(topGrupos)
    }
  }, [gqlData]);

  if (largura <= 768) { return null; }

  return <div className="direito">{categoriasTop}</div>

}

export default Direito;
