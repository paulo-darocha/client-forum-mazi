import { FC } from "react";
import Central from "../central/Central";
import Direito from "../direito/Direito";
import Esquerdo from "../Esquerdo";
import Usuarios from "../outrosUsuarios/Usuarios";
import Superior from "../Superior";

const Principal: FC = () => {
  return (
    <div className="App">
      <div className="superior">
        <Superior />
      </div>
      <Usuarios />
      <Esquerdo />
      <Central />
      <Direito />
    </div>
  );
};

export default Principal;