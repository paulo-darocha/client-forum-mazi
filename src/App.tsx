import { Redirect, Route, Switch } from "react-router-dom";
import Principal from "./componentes/rotas/Principal";
import "./App.css";
import Topico from "./componentes/rotas/Topico";
import PerfilUsuario from "./componentes/rotas/PefilUsuario";
import { useQuery } from "@apollo/client";
import { GetCategorias } from "./graphql/graphqlQueries";
import { TipoCategorias } from "./dataStore/CategoriasReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useAtualizaPerfil from "./auxiliares/useAtualizaPerfil";
import Imagens from "./auxiliares/Imagens";
import useImgFromServer from "./auxiliares/useImagemFromServer";
import { AppState } from "./dataStore/AppState";
import Membros from "./componentes/areas/outrosUsuarios/Membros";
import MembrosMobile from "./componentes/areas/outrosUsuarios/MembrosMobile";

const renderPrincipal = (props: any) => <Principal {...props} />
const renderTopico = (props: any) => <Topico {...props} />
const renderPerfil = (props: any) => <PerfilUsuario {...props} />
const renderImagem = (props: any) => <Imagens {...props} />

function App() {

  const { data: dadosCategorias } = useQuery(GetCategorias);
  const { execPerfil, atualizaPerfil } = useAtualizaPerfil();
  const { getImgFromServer } = useImgFromServer();
  const reduxDispatch = useDispatch();
  const perfil = useSelector((dataStore: AppState) => dataStore.perfil);

  useEffect(() => {
    //console.log("APP.EXEC_PERFIL", perfil?.usuario)
    execPerfil();
  }, [execPerfil]);
  
  useEffect(() => {
      //console.log("APP.ATUALIZA_PERFIL", perfil?.usuario)
      atualizaPerfil();
      getImgFromServer();
  }, [atualizaPerfil, execPerfil]);

  useEffect(() => {
    if (dadosCategorias && dadosCategorias.getCategorias) {
      reduxDispatch({
        type: TipoCategorias,
        payload: dadosCategorias.getCategorias
      })
    }
  }, [reduxDispatch, dadosCategorias]);
  
  return (
    <Switch>
      {/* <Route path="/" exact render={renderPrincipal} /> */}
      <Route path="/topicosdacateg/:catId?" render={renderPrincipal} />
      <Route path="/topico/:id?" render={renderTopico} />
      <Route path="/perfilusuario/:id" render={renderPerfil} />
      <Route path="/imagem/:id" render={renderImagem} />
      <Route path="/usuarios" component={MembrosMobile} />
      <Redirect to="/topicosdacateg" />
    </Switch>
  );
};

export default App;