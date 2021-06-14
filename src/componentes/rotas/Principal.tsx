import { FC } from "react";
import Central from "../areas/central/Central";
import Direito from "../areas/direito/Direito";
import Esquerdo from "../areas/Esquerdo";
import Superior from "../areas/Superior";
import Controle from "../areas/outrosUsuarios/Usuarios";

const Principal: FC = () => {
  return (
    <div className="App">
      <div className="superior">
        <Superior />
      </div>
      <Controle />
      <Esquerdo />
      <Central />
      <Direito />
    </div>
  );
};

export default Principal;