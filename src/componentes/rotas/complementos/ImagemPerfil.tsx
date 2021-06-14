import { FC } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../dataStore/AppState";
import semfoto from "../../../auxiliares/semfoto.png";

interface ImagemPerfilProp {
  altura: string;
}

const ImagemPerfil: FC<ImagemPerfilProp> = ({altura}) => {
  const imagem = useSelector((dataStore: AppState) => dataStore.imagem);
  
  //console.log("IMG-APP_STORE", imagem?.urlImagem);
  const img = imagem ? imagem.urlImagem : semfoto
  //console.log("IMG", img)
 
  return (
      <img src={img} alt="imagem" height={altura} />
  );
};

export default ImagemPerfil;