import { FC } from "react";
import { useSelector } from "react-redux";
import semfoto from "../../../auxiliares/semfoto.png";
import { ReduxType } from "../../../reduxStore/ReduxType";

interface ImagemPerfilProp {
  altura: string;
}

const ImagemPerfil: FC<ImagemPerfilProp> = ({altura}) => {
  const imagem = useSelector((dataStore: ReduxType) => dataStore.imagem);
  
  //console.log("IMG-APP_STORE", imagem?.urlImagem);
  const img = imagem?.urlImagem ?? semfoto
  //console.log("IMG", img)
 
  return (
      <img src={img} alt="imagem" height={altura} />
  );
};

export default ImagemPerfil;