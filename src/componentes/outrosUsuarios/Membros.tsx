import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import semfoto from "../../auxiliares/semfoto.png";
import { GetUsuariosAtivos } from "../../graphql/graphqlQueries";
import PerfilMembros from "./PerfilMembros";

export interface RespostaImagem {
  imgBlob: any;
  imgBlobURL: string
}

const Membros = () => {
  const { data: dados } = useQuery(GetUsuariosAtivos);
  const [membros, setMembros] = useState<JSX.Element | undefined>();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [bgColor, setBgColor] = useState("");
  const [foto, setFoto] = useState<Array<RespostaImagem>>([{
    imgBlob: "", imgBlobURL: semfoto
  }]);

  const onClickFechar = () => {
    setCurrentIndex(-1);
  };

  useEffect(() => {
    if (dados) {
      getUsuarios();
    }
  }, [dados, bgColor]);

  const getImgFromServer = async (id: string): Promise<RespostaImagem> => {
    const foto = await axios.get(`http://18.118.8.227:5000/imagem/${id}`, {
      responseType: "blob"
    });
    let fotoUrl = ""
    if (foto.data.type === "application/octet-stream") {
      fotoUrl = URL.createObjectURL(foto.data);
    } else {
      fotoUrl = semfoto;
    }

    //console.log(fotoUrl);

    return {
      imgBlob: foto.data,
      imgBlobURL: fotoUrl
    };
  }

  const getCards = async (): Promise<Array<RespostaImagem>> => {
    //console.log("USUARIOS.GETCARDS");
    let fotos: Array<RespostaImagem> = []

    const usuarios = dados.getUsuariosAtivos.usuarios;
    if (usuarios) {
      //console.log("USUARIO   LISTA    DEFINIDA   COM   SUCESSO", usuarios)
      for (let i = 0; i < usuarios.length; i++) {
        const resposta = await getImgFromServer(usuarios[i].id);
        fotos.push(resposta);
        //console.log("IMAGEM INSIDE FOR LOOP",)
      }
    }
    setFoto(fotos);
    return fotos;
  };

  const getUsuarios = () => {
    let cards: Array<JSX.Element>;
    console.log(dados.getUsuariosAtivos.usuarios);

    getCards().then(resposta => {
      cards = resposta.map((foto, i) => {
        //console.log("======= IMAGENS INSIDE GET_USUARIOS.MAP")
        return (
            <div className={`my-2 me-3 border rounded-3 menuIn`}
              style={{marginLeft: "-20px", cursor: "pointer"}}
              onClick={() => setCurrentIndex(i)}
            >
                <img src={foto.imgBlobURL} alt="FOTO" height="40" width="40"
                  style={{objectFit: "cover"}}
                />
                <span className="ms-2">
                  {dados.getUsuariosAtivos.usuarios[i].usuario}
                </span>
              
            </div>
        );
      });
      return cards;
    }).then(cards => setMembros(<ul>{cards}</ul>));
  }

  return (
    
    <React.Fragment>
      {console.log("RE")}
      {currentIndex >= 0 ? (<PerfilMembros 
        aberto={true}
        onClickFechar={onClickFechar}
        usuario={dados.getUsuariosAtivos.usuarios[currentIndex]}
        foto={foto[currentIndex]}
      />) : null}      
      
      <div>
        <div className="usuario text-white pt-3">
          <span className={`ms-3 mb-2`}>USUÁRIOS</span>
          {membros}
        </div>
      </div> 
    </React.Fragment>
  );
};
export default Membros;