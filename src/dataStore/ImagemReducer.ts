
export const TipoImagem = "IMAGENS";

interface ActionProps {
  type: string,
  payload: {
    imagem: any,
    urlImagem: any
  };
}

export const ImagemReducer = (
  dataStore: any = null,
  action: ActionProps
) => {
  switch (action.type) {
    case TipoImagem:
      return action.payload;

    default:
      return dataStore;
  }
};