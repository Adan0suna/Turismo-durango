import Image from "next/image";

import "./Tarjetas_Hoteleria.css";

import Estrellas_Calf from "../Estrellas/Estrellas";
import Carrusel from "../../components/Carrusel_N/Carrusel_N";

interface HoteleriaProps {
  Hotel_Nombre: string;
  Hotel_Info: string;
  Hotel_Lista: string[];
  Hotel_Calf: boolean;
  Hotel_Fotos: string[];
}

export default function Tarjetas_Hoteleria_Der({
  Hotel_Nombre,
  Hotel_Info,
  Hotel_Lista,
  Hotel_Calf,
  Hotel_Fotos,
}: HoteleriaProps) {
  return (
    <>
      <div className="Hoteleria_Tarjeta">
        <div className="TarjetaH_Izq">
          <div className="Izq_Izq">
            <div className="Hotel_Nombre">
              <h3>{Hotel_Nombre}</h3>
            </div>
            <div className="Hotel_Info">
              <h3>{Hotel_Info}</h3>
            </div>
            <div className="Hotel_Lista">
              {Hotel_Lista.map((elemento, index) => (
                <p key={index}>{elemento}</p>
              ))}
            </div>
            <div className="Hotel_Estrellas">
              <Estrellas_Calf calificacion={Hotel_Calf} />
            </div>
          </div>
          <div className="Izq_Der">
            <div className="CuadroA"></div>
          </div>
        </div>
        <div className="TarjetaH_Der">
          <div className="Imagen_Hoteles">
            <Carrusel images={Hotel_Fotos} />
          </div>
        </div>
      </div>
    </>
  );
}
