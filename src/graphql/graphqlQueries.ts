import { gql } from "@apollo/client";

export const GetCategorias = gql`
  query getCategorias {
    getCategorias {
      id
      nome 
    }
  }
`;

export const GetTopicosPorCategoria = gql `
  query getTopicosPorCategoria($categoriaId: ID!) {
    getTopicosPorCategoria(categoriaId: $categoriaId)  {
      ... on Msg {
        aviso
      }
      ... on TopicoArray {
        topicos {
          id
          titulo
          texto
          views
          pontos
          usuario {
            usuario
          }
          respostas {
            id
          }
          categoria {
            id
            nome
          }
        }
      }
    }
  }
`;

export const GetTopicosRecentes = gql `
  query getTopicosRecentes {
    getTopicosRecentes {
      ... on Msg {
        aviso
      }
      ... on TopicoArray {
        topicos {
          id
          titulo
          texto
          views
          pontos
          usuario {
            usuario
          }
          respostas {
            id
          }
          categoria {
            id
            nome
          }
        }
      }
    }
  }
`;


export const Perfil = gql `
  query perfil {
    perfil {
      ... on Msg {
        aviso
      }
      ... on Usuario {
        id
        usuario
        topicos {
          id
          titulo
        }
        respostas {
          id
          topico {
            id
          }
          texto
        }
      }
    }
  }
`;


export const GetTopicoPorId = gql `
  query getTopicoPorId($id: ID!) {
    getTopicoPorId(id: $id) {
      ... on Msg {
        aviso
      }
      ... on Topico {
        id
        usuario {
          id
          usuario
        }
        modificadoEm
        titulo
        texto
        pontos
        categoria {
          id
          nome
        }
        respostas {
          id
          texto
          pontos
          topico {
            id
          }
          usuario {
            id
            usuario
          }
          criadoEm
        }
      }
    }
  }
`;

export const GetTopCategoriaTopico =  gql `
  query getTopCategoriaTopico {
    getTopCategoriaTopico {
      topicoId
      categoriaId
      categoriaNome
      titulo
    }
  }
`;

export const GetUsuariosAtivos = gql `
  query getUsuariosAtivos {
  getUsuariosAtivos {
    ... on Msg {
      aviso
    }
    ... on UsuarioArray {
      usuarios {
        id
        usuario
      }
    }
  }
}
`;

