import Image from "next/image";
import "./Galeria_Gastronomia.css";

export default function Galeria_Gastronomia() {
  return (
    <>
      <div className="Galeria_Contenedor">
        <div className="Columna_Izq">
          <div className="Imagen_Galeria">
            <Image
              src="/assets/Landing/Galeria1.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
          <div className="Imagen_Galeria">
            <Image
              src="/assets/Landing/Galeria2.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
          <div className="Imagen_Galeria">
            <Image
              src="/assets/Landing/Galeria3.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
          <div className="Imagen_Galeria">
            <Image
              src="/assets/Landing/Galeria4.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
        </div>
        <div className="Columna_Der">
          <div className="Imagen_Galeria1">
            <Image
              src="/assets/Landing/Galeria5.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
          <div className="Imagen_Galeria1">
            <Image
              src="/assets/Landing/Galeria6.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
          <div className="Imagen_Galeria1">
            <Image
              src="/assets/Landing/Galeria7.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
          <div className="Imagen_Galeria1">
            <Image
              src="/assets/Landing/Galeria8.jpg"
              alt="Img_Galeria"
              width={1000}
              height={1000}
              className="Img_Galeria"
            />
          </div>
        </div>
      </div>
    </>
  );
}
