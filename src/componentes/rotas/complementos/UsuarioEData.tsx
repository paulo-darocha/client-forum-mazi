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
  // let data = modificadoEm?.toString();
  // data = data?.substring(0, 10);
  // //console.log("DATA", data);

  const data = () => {
    let data = modificadoEm?.toLocaleString();
    return data?.substring(0, 10);
  }

  return (
    <span>
      <label className="h5">
        <strong>{usuario ? usuario : ""}</strong>
      </label>
      <label className="ps-3">
        {data()}
      </label>
    </span>
  );
};

export default UsuarioEData;