import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../dataStore/AppState";
import { TipoImagem } from "../dataStore/ImagemReducer";


interface ImagemResult {
  getImgFromServer: (id?: any) => void;
}

const useImgFromServer  = (): ImagemResult => {
  const dispatch = useDispatch();
  const perfil = useSelector((dataStore: AppState) => dataStore.perfil);

  const getImgFromServer = async (id?: string) => {
    let userId = "";
    if (perfil) {
      userId = perfil.id
    } else if (id) {
      userId = id
    }
    //console.log("GET_IMG_FROM_SERVER");
    await axios.get(`http://18.118.8.227:5000/imagem/${userId}`, {
      responseType: "blob"
    })
      .then(resposta => {
        //console.log("IMG FROM SERVER", resposta.data.type);
        if (resposta.data.type === "application/octet-stream") {
          dispatch({
            type: TipoImagem,
            payload: {
              imagem: resposta.data,
              urlImagem: URL.createObjectURL(resposta.data)
            }
          });
        } else {
          dispatch({ type: TipoImagem, payload: null })
        }
      })
  };

  return { getImgFromServer };

};
export default useImgFromServer;
