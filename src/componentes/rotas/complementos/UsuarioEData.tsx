import { FC } from "react";

interface UsuarioEDataProps {
  usuario?: string | null;
  modificadoEm?: Date;
}

const UsuarioEData: FC<UsuarioEDataProps> = ({
  usuario,
  modificadoEm
}) => {

  // let data = modificadoEm?.toLocaleString("default");
  let data = modificadoEm?.toLocaleString();
  data = data?.substring(0, 10);
  
  // //console.log("DATA", data);

  return (
    <span>
      <label className="h5">
        <strong>{usuario ? usuario : ""}</strong>
      </label>
      <label className="ps-3">
        {data ? data : "DATA"}
      </label>
    </span>
  );
};

export default UsuarioEData;