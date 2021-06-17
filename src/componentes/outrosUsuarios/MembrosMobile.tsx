import React from "react";
import { useLarguraTela } from "../../auxiliares/useLarguraTela";
import Superior from "../Superior";
import Membros from "./Membros";

const MembrosMobile = () => {
  const { largura } = useLarguraTela();

    return (
      <div> 
        <nav className="superior" style={{minHeight: "4em"}}>
          <Superior />
        </nav>
        <Membros />
      </div>
    );
  
  
  return <Membros />
};

export default MembrosMobile;