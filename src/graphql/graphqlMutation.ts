import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation Login($usuario: String!, $senha: String!) {
    login(usuario: $usuario, senha: $senha) {
      ... on Msg {
        aviso
      }
      ... on Usuario {
        id
        usuario
      }
    }
  }
`;

export const LogoutMutation = gql`
  mutation logout($usuario: String!) {
    logout(usuario: $usuario)
  }
`;

export const AlterarSenha = gql`
  mutation AlterarSenha($novaSenha: String!) {
    alterarSenha(novaSenha: $novaSenha)
  }
`;

export const AtualizarPontoTopico = gql`
  mutation AtualizarPontoTopico(
    $topicoId: ID!, $somaUm: Boolean!
  ) {
    atualizarPontoTopico(topicoId: $topicoId, somaUm: $somaUm)
  }
`;

export const AtualizaRespostaPonto = gql`
  mutation atualizaRespostaPonto(
    $respostaId: ID!, $somaUm: Boolean!
  ) {
    atualizaRespostaPonto(
      respostaId: $respostaId, somaUm: $somaUm
    )
  }
`;

export const CriarTopico = gql`
  mutation criarTopico(
    $usuarioId: ID!
    $categoriaId: ID!
    $titulo: String!
    $texto: String!
  ) {
    criarTopico(
      usuarioId: $usuarioId
      categoriaId: $categoriaId
      titulo: $titulo
      texto: $texto
    ) {
      aviso
    }
  }
`;

export const CriarResposta = gql`
  mutation criarResposta(
    $usuarioId: ID!, $topicoId: ID!, $texto: String!
  ) {
    criarResposta(
      usuarioId: $usuarioId, topicoId: $topicoId, texto: $texto
    ) {
      aviso
    }
  }
`;

export const RegistroMutation = gql`
  mutation registro(
    $email: String!, $usuario: String!, $senha: String!
  ) {
    registro(
      email: $email, usuario: $usuario, senha: $senha
    ) {
      ... on Msg {aviso}
      ... on Usuario {id, usuario, senha}
    }
  }
`;

export const ApagaUsuarioMutation = gql`
  mutation apagaUsuario($usuarioId: ID!) {
    apagaUsuario(usuarioId: $usuarioId)
  }
`;