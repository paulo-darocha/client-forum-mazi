import { combineReducers } from "redux";
import { CategoriasReducer } from "./CategoriasReducer";
import { ImagemReducer } from "./ImagemReducer";
import { PerfilUsuarioReducer } from "./PerfilReducer";

export const rootReducer = combineReducers({
  perfil: PerfilUsuarioReducer,
  categorias: CategoriasReducer,
  imagem: ImagemReducer
});

export type AppState = ReturnType<typeof rootReducer>