import Image from "next/image";
import Estrellas_Calf from "../Estrellas/Estrellas";
import "./Tarjetas_Restaurantes.css";
import Link from "next/link";

interface Tarjetas_Restaurantes_Props {
  Img_Restaurantes: string;
  Restaurantes_Nombres: string;
  Restaurantes_Calificacion: number;
}

export default function Tarjetas_Restaurantes({
  Img_Restaurantes,
  Restaurantes_Nombres,
  Restaurantes_Calificacion,
}: Tarjetas_Restaurantes_Props) {
  const calificacionNumerica = Number(Restaurantes_Calificacion);

  return (
    <>
      <Link href="/Vista_Negocio">
        <div className="Tarjeta">
          <div className="Tarjeta_Container">
          <Image
            src={Img_Restaurantes.startsWith('http') ? Img_Restaurantes : "/assets/Landing/" + Img_Restaurantes}
            alt={Restaurantes_Nombres}
            width={300}
            height={400}
            className="Img_Tarjeta"
            onError={(e) => {
              console.error(`Error al cargar imagen: ${Img_Restaurantes}`);
            }}
          />
          <div className="Res_Info">
            <p>{Restaurantes_Nombres}</p>
            <div className="Estrellas_Contenedor">
              <Estrellas_Calf calificacion={calificacionNumerica} />
            </div>
          </div>
          </div>
        </div>
      </Link>
    </>
  );
}
