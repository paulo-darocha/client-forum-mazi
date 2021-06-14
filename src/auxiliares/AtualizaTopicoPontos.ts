import { useMutation } from "@apollo/client";
import { AtualizarPontoTopico } from "../graphql/graphqlMutation";

const useAtualizaPontoTopico = (
  atualizaTopico?: () => void,
  topicoId?: string
) => {
  const [execPontoTopico] = useMutation(AtualizarPontoTopico);

  const onClickSomaPontoTop = async (e: any) => {
    e.preventDefault();
    await execPontoTopico({ variables: { topicoId, somaUm: true } });
    atualizaTopico && atualizaTopico();
  };

  const onClickSubtraiPontoTop = async (e: any) => {
    e.preventDefault();
    await execPontoTopico({ variables: { topicoId, somaUm: false } });
    atualizaTopico && atualizaTopico();
  };

  return {
    onClickSomaPontoTop,
    onClickSubtraiPontoTop
  }
};

export default useAtualizaPontoTopico;