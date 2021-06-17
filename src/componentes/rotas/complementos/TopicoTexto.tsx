import { FC } from "react";
import { Node } from "slate";
import SlateEditor from "../../../slate-text-editor/SlateEditor";

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
      <div className="border border-white rounded-1 p-2 bg-white">
        <SlateEditor 
          existingBody={texto} 
          readOnly={readOnly} 
          sendOutBody={enviaTexto}
        />
      </div>
    </div>
  );
};

export default TopicoTexto;