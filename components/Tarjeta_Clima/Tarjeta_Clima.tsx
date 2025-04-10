import "./Tarjeta_Clima.css";

interface ClimaProps {
  Mes: string;
  Temperatura: string;
  Dias_LLuvia: string;
  Ocupacion: string;
}

export default function Tarjeta_Clima({
  Mes,
  Temperatura,
  Dias_LLuvia,
  Ocupacion,
}: ClimaProps) {
  return (
    <>
      <div className="Trj_Clima">
        <div className="Mes">{Mes}</div>
        <div className="info_clima">{Temperatura}</div>
        <div className="info_clima">{Dias_LLuvia}</div>
        <div className="info_clima">{Ocupacion}</div>
      </div>
    </>
  );
}
