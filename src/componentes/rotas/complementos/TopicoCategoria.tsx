import { FC } from "react";
import DropDown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import CategoriaDropDown from "../../../auxiliares/CategoriasDropDown";
import ICategoria from "../../../modelos/ICategoria";

interface TopicoCategoriaProps {
  categoria?: ICategoria;
  enviaCategoriaSelecionada: (cat: ICategoria) => void;
}

const TopicoCategoria: FC<TopicoCategoriaProps> = ({
  categoria,
  enviaCategoriaSelecionada
}) => {

  return (
    <div>
      <strong>{categoria?.nome}</strong>
      <CategoriaDropDown 
        categoriaPreSelecionada={categoria}
        enviaCategoriaSelecionada={enviaCategoriaSelecionada}
      />
    </div>
  );
  
};

export default TopicoCategoria;