import Categoria from "./ICategoria";
import IResposta from "./IResposta";
import IUsuario from "./IUsuario";

export default class ITopico {
  constructor(
    public id: string,
    public views: number,
    public titulo: string,
    public texto: string,
    public usuario: IUsuario,
    public pontos: number,
    public criadoEm: Date,
    public modificadoEm: Date,
    public respostas: Array<IResposta>,
    public categoria: Categoria
  ) {}
}
