import { Dispatch } from "react";

export const autorizaEnvio = (
  dispatch: Dispatch<any>,
  msg: String,
  setDesativado: boolean
) => {
  dispatch({ type: "envioDesativado", payload: setDesativado });
  dispatch({ type: "msgResultado", payload: msg })
}
