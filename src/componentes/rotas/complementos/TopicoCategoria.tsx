import { FC } from "react";
import DropDown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import ICategoria from "../../../modelos/ICategoria";
import CategoriaDropDown from "../../comum/CategoriasDropDown";

interface TopicoCategoriaProps {
  categoria?: ICategoria;
  enviaCategoriaSelecionada: (cat: ICategoria) => void;
}

const TopicoCategoria: FC<TopicoCategoriaProps> = ({
  categoria,
  enviaCategoriaSelecionada
}) => {
  const catOptions: Array<string | Option> = [
    {value: "1", label: "Programação"},
    {value: "2", label: "Culinária"},
    {value: "3", label: "Esportes"},
    {value: "4", label: "Entretenimento"},
    {value: "5", label: "Viagens"}
  ]

  const defaultOption = catOptions[0];

  // const enviaCategoriaSelecionada = (cat: ICategoria) => {
  //   //console.log("Categoria Selecionada", cat);
  // }

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