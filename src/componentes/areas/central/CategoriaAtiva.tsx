import { FC } from "react";
import { useLarguraTela } from "../../../auxiliares/useLarguraTela";
import Categoria from "../../../modelos/ICategoria";
import CategoriaDropDown from "../../comum/CategoriasDropDown";

interface CategoriaAtivaProps {
  categoria?: Categoria | undefined;
}

const CategoriaAtiva: FC<CategoriaAtivaProps> = ({categoria}) => {

  const { largura } = useLarguraTela();

  const getCategoriaAtiva = () => {
    if (largura <= 576) {
      return (
        <strong style={{fontSize: "1.1em"}}>
          <CategoriaDropDown
            navigate={true}
            categoriaPreSelecionada={categoria}
          />
        </strong>
      );
    } else {
      return <strong style={{fontSize: "1.1em"}}>
        {categoria?.nome || "Categoria"}
      </strong>
    }
  }

  return (
    <div className="border border-dark mx-3">
      <div className="p-2 bg-white">
        {getCategoriaAtiva()}
      </div>
    </div>
  );
};

export default CategoriaAtiva;