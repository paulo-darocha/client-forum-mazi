import { FC } from "react";
import UsuarioEData from "./UsuarioEData";

interface TopicoNomeProps {
  usuario?: string | null;
  modificadoEm: Date;
  titulo?: string;
}

const TopicoNome: FC<TopicoNomeProps> = ({
  usuario, modificadoEm, titulo
}) => {
  return (
    <div>
      <h4>{titulo}</h4>
      <UsuarioEData usuario={usuario} modificadoEm={modificadoEm} />
      <hr />
    </div>
  );
};

export default TopicoNome; 