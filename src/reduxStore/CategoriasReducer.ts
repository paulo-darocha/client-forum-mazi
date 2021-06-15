import ICategoria from "../modelos/ICategoria";

export const TipoCategorias = "CATEGORIAS";

interface ActionProps {
  type: string,
  payload: Array<ICategoria> | null;
}

export const CategoriasReducer = (
  dataStore: any = null,
  action: ActionProps
) => {
  switch (action.type) {
    case TipoCategorias:
      return action.payload;

    default:
      return dataStore;
  }
};