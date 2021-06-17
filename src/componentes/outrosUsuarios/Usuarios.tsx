import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import Membros from "./Membros";


const Usuarios = () => {
  const { largura } = useLarguraTela();

  if (largura < 768) {
    return null;
  }
  
  return (
    <div>
      <Membros />
    </div>
  );
};

export default Usuarios;