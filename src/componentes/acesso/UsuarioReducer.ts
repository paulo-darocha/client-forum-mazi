const usuarioReducer = (state: any, action: any) => {

  switch (action.type) {
    case "nome":
      return { ...state, nome: action.payload };

    case "senha":
      return { ...state, senha: action.payload };

    case "confirmaSenha":
      return { ...state, confirmaSenha: action.payload };

    case "email":
      return { ...state, email: action.payload };

    case "msgResultado":
      return { ...state, msgResultado: action.payload };

    case "envioDesativado":
      //console.log("ENVIO_DESATIVADO", action.payload)
      return { ...state, envioDesativado: action.payload }

    case "reset":
      return {}

    default:
      return { ...state, msgResultado: "Ocorreu um erro." };
  }
};

export default usuarioReducer;