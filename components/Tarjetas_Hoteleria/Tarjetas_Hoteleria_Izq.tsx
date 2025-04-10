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

export default function Tarjetas_Hoteleria_Izq({
  Hotel_Nombre,
  Hotel_Info,
  Hotel_Lista,
  Hotel_Calf,
  Hotel_Fotos,
}: HoteleriaProps) {
  return (
    <>
      <div className="Hoteleria_Tarjeta2">
        <div className="TarjetaH_Der2">
          <div className="Imagen_Hoteles2">
            <Carrusel images={Hotel_Fotos} />
          </div>
        </div>
        <div className="TarjetaH_Izq2">
          <div className="Izq_Der2">
            <div className="CuadroA2"></div>
          </div>
          <div className="Izq_Izq2">
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
            <div className="Hotel_Estrellas2">
              <Estrellas_Calf calificacion={Hotel_Calf} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
