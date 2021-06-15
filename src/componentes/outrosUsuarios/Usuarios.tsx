import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import Membros from "./Membros";


const Usuarios = () => {
  const { largura } = useLarguraTela();

  if (largura < 576) {
    return null;
  }
  
  return <Membros />
};

export default Usuarios;