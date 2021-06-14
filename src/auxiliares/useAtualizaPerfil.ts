import { QueryLazyOptions, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../dataStore/AppState";
import { TipoImagem } from "../dataStore/ImagemReducer";
import { PerfilUsuarioTipo } from "../dataStore/PerfilReducer";
import { Perfil } from "../graphql/graphqlQueries";

interface UseAtualizaPerfilResposta {
  execPerfil: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
  apagaPerfil: () => void;
  atualizaPerfil: () => void;
}

const useAtualizaPerfil = (): UseAtualizaPerfilResposta => {
  const [execPerfil, { data }] = useLazyQuery(Perfil);
  // const { data: data1 } = useQuery(Perfil);
  const reduxDispatch = useDispatch();
  const imagemDispatch = useDispatch();
  const perfil = useSelector((dataStore: AppState) => dataStore.perfil);

  const apagaPerfil = () => {
    //console.log("APAGA_PERFIL.DATA STORE ===> NULL");
    reduxDispatch({
      type: PerfilUsuarioTipo,
      payload: null
    });
    imagemDispatch({
      type: TipoImagem,
      payload: null
    });
  }

  useEffect(() => {
    //console.log("====>");
    if (data && data.perfil.usuario) {
      //console.log("   hook EXEC USUARIO", data);
    } else {
      //console.log("   hook EXEC AVISO", data);
    }
  }, [execPerfil]);

  const atualizaPerfil = () => {
    if (data && data.perfil && data.perfil.usuario) {
      //console.log("ATUALIZA_PERFIL.DATA_STORE ===>", data);
      reduxDispatch({
        type: PerfilUsuarioTipo,
        payload: data.perfil
      });
    } else {
      apagaPerfil();
      //console.log("PERFIL APAGADO");
    }
  }

  return { execPerfil, apagaPerfil, atualizaPerfil };
};

export default useAtualizaPerfil;