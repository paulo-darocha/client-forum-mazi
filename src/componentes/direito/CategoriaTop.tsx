import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoriaTopico from "../../modelos/CategoriaTopico";

interface CategoriaTopProps {
  categoriasTop: Array<CategoriaTopico>;
}

const CategoriaTop: FC<CategoriaTopProps> = ({categoriasTop}) => {
  const [topicos, setTopicos] = useState<JSX.Element | undefined>();

  useEffect(() => {
    if (categoriasTop && categoriasTop.length > 0) {
      const topicoElems = categoriasTop.map(top =>
        <li key={top.topicoId} className="p-1">
          <Link to={`/topico/${top.topicoId}`} className="text-decoration-none">
            <span className="fw-bold">
              {top.titulo}
            </span>
          </Link>
        </li>);
        setTopicos(<ul>{topicoElems}</ul>)
    }
  } ,[categoriasTop]);

  return (
    <div className="py-1">
      <div className="ps-2">
        <strong>{categoriasTop[0].categoriaNome}</strong>
      </div>
      {topicos}
    </div>
  );


};

export default CategoriaTop;