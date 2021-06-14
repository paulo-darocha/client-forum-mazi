import IResposta from "./IResposta";
import ITopico from "./ITopico";

export default class IUsuario {
  constructor(
    public id: string,
    public email: string,
    public usuario: string,
    public topicos?: Array<ITopico>,
    public respostas?: Array<IResposta>
  ) {}
}