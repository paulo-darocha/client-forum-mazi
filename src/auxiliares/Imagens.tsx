import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../dataStore/AppState";
import useImgFromServer from "./useImagemFromServer";

interface ImagensProps {
  cancelaTexto?: string,
  aberto: boolean,
  onClickAlterna: (e: any) => void
  onClickSair?: (e: any) => void;
  onClickProsseguir?: (e: any) => void;
  novoUsuarioId?: string
}


const Imagens: FC<ImagensProps> = ({
  cancelaTexto,
  aberto,
  onClickAlterna,
  onClickSair,
  onClickProsseguir,
  novoUsuarioId
}) => {
  const [imagem, setImagem] = useState<any>();
  const [imagemNome, setImagemNome] = useState("");
  const imgRedux = useSelector((dataStore: AppState) => dataStore.imagem);
  const perfil = useSelector((dataStore: AppState) => dataStore.perfil);
  const { getImgFromServer } = useImgFromServer();

  useEffect(() => {
    if (imgRedux) {
      setImagem(imgRedux.imagem);
      setImagemNome(imgRedux.urlImagem);
    }
  }, [imgRedux]);

  const onChangeImagem = (e: any) => {
    setImagem(e.target.files[0]);
    const imagemURL = URL.createObjectURL(e.target.files[0]);
    setImagemNome(imagemURL);
  };

  const onClickEnviaImg = (e: any) => {
    postImgToServer();
    onClickAlterna(e);
    onClickProsseguir && onClickProsseguir(e);
  };

  const postImgToServer = async () => {
    let usid = "";
    if (novoUsuarioId) { usid = novoUsuarioId }
    else if (perfil) { usid = perfil.id }
    if (usid) {
      const formData = new FormData();
      formData.append("imagem", imagem);
      formData.append("usid", usid);
      if (!imagem || imagem == null) {
        return;
      } else {
        await axios.post("http://18.118.8.227:5000/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          // params: { id: "3" }
        }).then(() => getImgFromServer(novoUsuarioId));
      }
    }
  };

  return (

    <ReactModal
      className="modal-menu"
      isOpen={aberto}
      onRequestClose={onClickAlterna}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={true}
    >

      <label className="my-2">Procurar Imagem</label>
      <input
        className="form-control px-2"
        type="file" accept="image"
        onChange={onChangeImagem}
      />

      <div className=" text-center">

        <div className="p-3 m-3">
          <img src={imagemNome} alt="ImagemRegistro" width="300" />
        </div>

        <button
          className="btn btn-primary mx-3"
          onClick={onClickEnviaImg}
          disabled={imagemNome ? false : true}
        >
          Enviar Imagem
        </button>
        <button
          className="btn btn-secondary mx-3"
          onClick={onClickSair || onClickAlterna}
        >
          {cancelaTexto || "Sair"}
        </button>
      </div>
    </ReactModal>

  );
};

export default Imagens;