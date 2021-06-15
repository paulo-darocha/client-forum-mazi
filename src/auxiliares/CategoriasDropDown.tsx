import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDown, { Option } from "react-dropdown";
import { useHistory } from "react-router";
import ICategoria from "../modelos/ICategoria";
import { ReduxType } from "../reduxStore/ReduxType";

const defaultLabel = "Selecione Categoria";

const defaultOption = {
  value: "0",
  label: defaultLabel
}

class CategoriaDropDownProps {
  enviaCategoriaSelecionada?: (cat: ICategoria) => void;
  navigate?: boolean = false;
  categoriaPreSelecionada?: ICategoria | undefined;
}

const CategoriaDropDown: FC<CategoriaDropDownProps> = ({
  enviaCategoriaSelecionada,
  navigate,
  categoriaPreSelecionada
}) => {
  const categorias = useSelector((dataStore: ReduxType) => dataStore.categorias);

  const [categoriasOption, setCategoriasOption] = 
    useState<Array<Option>>([defaultOption]);

  const [optSelecionada, setOptSelecionada] = 
    useState<Option>(defaultOption);

  const history = useHistory();

  useEffect(() => {
    if (categorias) {
      const catOptions: Array<Option> = categorias.map((cat: ICategoria) => {
        return {
          value: cat.id,
          label: cat.nome
        }
      });
      setCategoriasOption(catOptions);

      setOptSelecionada({
        value: categoriaPreSelecionada ? categoriaPreSelecionada.id : "0",
        label: categoriaPreSelecionada ? categoriaPreSelecionada.nome : defaultLabel
      });
    }
  }, [categorias, categoriaPreSelecionada]);

  const onChangeDropDown = (selecionada: Option) => {
    setOptSelecionada(selecionada);
    if (enviaCategoriaSelecionada) {
      enviaCategoriaSelecionada(
        new ICategoria(
          selecionada.value, selecionada.label?.valueOf().toString() ?? "")
      );
    }
    if (navigate) {
      history.push(`/topicosdacateg/${selecionada.value}`)
    }
  };

  return (
    <DropDown 
      className=""
      options={categoriasOption}
      onChange={onChangeDropDown}
      value={optSelecionada}
      placeholder={defaultLabel}
    />
  );
};

export default CategoriaDropDown;