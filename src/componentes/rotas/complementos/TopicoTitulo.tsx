import { FC, useEffect, useState } from "react";

interface TopicoTituloProps {
  titulo?: string;
  readOnly: boolean;
  enviaTitulo: (titulo: string) => void;
}

const TopicoTitulo: FC<TopicoTituloProps> = ({
  titulo,
  readOnly,
  enviaTitulo
}) => {
  const [tituloAtual, setTituloAtual] = useState("");

  useEffect(() => {
    setTituloAtual(titulo || "");
  }, [titulo]);

  const onChangeTitulo = (e: any) => {
    setTituloAtual(e.target.value);
    enviaTitulo(e.target.value);
  }

  return (
    <div className="my-2">
      <strong>Titulo</strong>
      <div className="me-1">
        <input 
          className="form-control"
          type="text"
          value={tituloAtual}
          onChange={onChangeTitulo}
          placeholder="Title"
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default TopicoTitulo;