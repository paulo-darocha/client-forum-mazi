import { useLarguraTela } from "../../../auxiliares/useLarguraTela";
import Superior from "../Superior";
import Membros from "./Membros";

const MembrosMobile = () => {
  const { largura } = useLarguraTela();

  if (largura < 576) {
      
      return <div> 
        <nav className="superior">
          <Superior />
        </nav>
        <Membros />
    </div>
  }
  
  return <Membros />
};

export default MembrosMobile;