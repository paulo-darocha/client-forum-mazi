import ITopico from "./ITopico";
import IUsuario from "./IUsuario";

export default class IResposta {
  constructor(
    public id: string,
    public views: number,
    public pontos: number,
    public texto: string,
    public usuario: IUsuario,
    public criadoEm: Date,
    public topico: ITopico,
  ) {}
}