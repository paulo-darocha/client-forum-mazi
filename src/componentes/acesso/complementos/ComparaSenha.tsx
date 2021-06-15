import React, { FC } from "react";
import { SenhaValida, TesteSenhaResultado } from "../../../auxiliares/ValidadorSenha";
import { autorizaEnvio } from "../AutorizaEnvio";

interface ComparaSenhaProps {
  dispatch: React.Dispatch<any>;
  senha: string;
  confirmaSenha: string;
}

const ComparaSenha: FC<ComparaSenhaProps> = ({
  dispatch, senha, confirmaSenha
}) => {

  const onChangeSenha = (e: any) => {
    dispatch({ type: "senha", payload: e.target.value });
    const confereSenha: TesteSenhaResultado = SenhaValida(e.target.value);
    if (!confereSenha.valida) {
      autorizaEnvio(dispatch, confereSenha.mensagem, true);
      return;
    }
    senhasIguais(confirmaSenha, e.target.value);
  };

  const onChangeConfirmaSenha = (e: any) => {
    dispatch({ type: "confirmaSenha", payload: e.target.value })
    const confereSenha: TesteSenhaResultado = SenhaValida(e.target.value);
    if (!confereSenha.valida) {
      autorizaEnvio(dispatch, confereSenha.mensagem, true);
      return;
    }
    senhasIguais(senha, e.target.value);
  };

  const senhasIguais = (senha: string, confirmaSenha: string) => {
    if (senha !== confirmaSenha) {
      autorizaEnvio(dispatch, "Senhas não são iguais", true);
      return false;
    } else {
      autorizaEnvio(dispatch, "", false);
      return true;
    }
  };

  return (
    <React.Fragment>
      <div>
        <label>Senha:</label>
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={onChangeSenha}
        />
      </div>

      <div>
        <label>Confirmar senha:</label>
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Confirmar senha"
          value={confirmaSenha}
          onChange={onChangeConfirmaSenha}
        />
          </div>
    </React.Fragment>
  );

}

export default ComparaSenha;
