import { headers } from "next/headers";
import "./Tarjetas_Naturaleza.css";

interface NaturalezaProps {
  Naturaleza_Fondo1: string;
  Naturaleza_Fondo2: string;
  Naturaleza_Fondo3: string;
  Naturaleza_Nombre: string;
  Naturaleza_Descripcion: string;
}

export default function Tarjetas_Naturaleza_Der({
  Naturaleza_Fondo1,
  Naturaleza_Fondo2,
  Naturaleza_Fondo3,
  Naturaleza_Nombre,
  Naturaleza_Descripcion,
}: NaturalezaProps) {
  return (
    <div className="Tarjeta_Naturaleza">
      <div className="Galeria_Naturaleza_Seccion1">
        <div className="Info_Naturaleza_Tarjeta">
          <div className="Info_Naturaleza_Der">
            <div className="Desc_Tarjeta_Naturaleza">
              <p>{Naturaleza_Descripcion}</p>
            </div>
          </div>
          <div className="Info_Naturaleza_Izq">
            <div className="Nombre_Tarjeta_Naturaleza">
              <h1>{Naturaleza_Nombre}</h1>
            </div>
          </div>
        </div>
        <div
          className="Imagenes_Naturaleza"
          style={{
            backgroundImage: `url("/assets/Naturaleza/${Naturaleza_Fondo1}")`,
          }}
        ></div>
        <div
          className="Imagenes_Naturaleza"
          style={{
            backgroundImage: `url("/assets/Naturaleza/${Naturaleza_Fondo2}")`,
          }}
        ></div>
        <div
          className="Imagenes_Naturaleza"
          style={{
            backgroundImage: `url("/assets/Naturaleza/${Naturaleza_Fondo3}")`,
          }}
        ></div>
      </div>
    </div>
  );
}
