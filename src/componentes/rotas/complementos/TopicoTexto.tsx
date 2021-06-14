import { FC } from "react";
import RichEditor from "../../editor/RichEditor";
import { Node } from "slate";

interface TopicoTextProps {
  texto?: string;
  readOnly: boolean;
  enviaTexto: (texto: Node[]) => void;
}

const TopicoTexto: FC<TopicoTextProps> = ({ 
  texto, 
  readOnly,
  enviaTexto 
}) => {

  //console.log("TOPICO_TEXTO", texto);
  return (
    <div className="my-2 me-1">
      <strong>Texto</strong>
      <div className="border border-success rounded-1 p-2 bg-white">
        <RichEditor 
          existingBody={texto} 
          readOnly={readOnly} 
          sendOutBody={enviaTexto}
        />
      </div>
    </div>
  );
};

export default TopicoTexto;