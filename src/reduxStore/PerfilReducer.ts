import IUsuario from "../modelos/IUsuario";

export const PerfilUsuarioTipo = "PERFIL_USUARIO";

export interface PerfilUsuarioAction {
  type: string;
  payload: IUsuario;
}

export const PerfilUsuarioReducer = (
  state: any = null,
  action: PerfilUsuarioAction
): IUsuario | null => {
  
  switch (action.type) {

    case PerfilUsuarioTipo:
      //console.log("PERFIL_REDUCER.USUARIO", action.payload?.usuario)
      return action.payload;

    default:
      return state;
  }
}