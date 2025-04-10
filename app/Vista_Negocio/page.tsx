"use client";

/*=====
Estilos
=====*/
import "./Negocio.css";

/*=======================
Importacion de los iconos
=======================*/
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaPaperclip,
  FaPaperPlane,
  FaTimesCircle,
} from "react-icons/fa";

/*==============
Cositas de next
==============*/
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

/*========================
Importacion de componentes
========================*/
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Estrellas_Calf from "../../components/Estrellas/Estrellas";
import Calificar from "../../components/Calificar/Calificar";
import Comentarios from "../../components/Comentarios/Comentarios";

/*==================================================
Funcion para que muestre todas las imagenes del menu
me dio weba hacerlo un componente
==================================================*/
function Galeria_Menu({ lista_menu }: { lista_menu: string[] | undefined }) {
  const menu = lista_menu || []; // Proporcionar un valor predeterminado si lista_menu es undefined

  return (
    <div className="Galeria_Menu_Contenedor">
      {menu.map((elemento, index) => (
        <div key={index} className="Tarjeta_Menu">
          <Image
            src={"/assets/Negocio/" + elemento}
            alt={`Imagen ${index + 1}`}
            width={300}
            height={400}
          />
        </div>
      ))}
    </div>
  );
}

/*===============
Funcion principal
===============*/
type NegocioData = {
  nombre: string;
  horario_apertura: string;
  horario_cierre: string;
  ubicacion: string;
  telefono: string;
  correo: string;
  calificacion: number;
  msj_menu?: string;
  imagenes_menus?: string[];
  imagenes: string[];
  promedio_estrellas: number;
};

export default function Negocio() {
  const [negocioData, setNegocioData] = useState<NegocioData | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Mover todos los hooks al inicio del componente para garantizar el orden
  useEffect(() => {
    const fetchNegocioData = async () => {
      try {
        const response = await fetch("/api/business?negocio_id=13");
        const data: NegocioData = await response.json();
        setNegocioData(data);
      } catch (error) {
        console.error("Error fetching negocio data:", error);
      }
    };

    fetchNegocioData();
  }, []);

  if (!negocioData) {
    return <div>Cargando...</div>;
  }

  /*===============================================
Estan son variables de ejemplo para los comentarios
=================================================*/
  var Img_Ruta = "/assets/Negocio/fondo.jpg";
  var Img_User = "/assets/Negocio/Img_Perfil.jpg";
  var User = "Maria Eliot";
  var Calificacion = 3;
  var Comentario = "bonita ciudad, la gente es muy amable, volveré";

  /*=================================================================================
  Todo esto es para la funcion de enviar la calificacion, comentario e imagen a la bd
  Lo deje mas o menos preparado pero no se si les sirva
===================================================================================*/
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Por favor, selecciona una calificación antes de enviar.");
      return;
    }

    const data = {
      rating,
      comment,
      image, // Guardará la imagen en base64 (se recomienda enviar al backend y almacenar en la BD o un servidor de archivos)
    };

    console.log("Datos listos para enviar:", data);
    // Aquí pueden hacer la petición a la bd (creo)
  };

  return (
    <>
      <Navbar />
      <div className="Negocio_Contenedor">
        <div className="Negocio_Fondo">
          <div className="Msj_Negocio">
            <h1>{negocioData.nombre}</h1>
          </div>
        </div>
        <div className="Negocio_Seccion1">
          <div className="Negocio_Seccion1_Izq">
            <div className="Seccion1N_Redes">
              <Link href="./" className="Negocio_Redes">
                <FaGoogle />
              </Link>
              <Link href="./" className="Negocio_Redes">
                <FaFacebookF />
              </Link>
              <Link href="./" className="Negocio_Redes">
                <FaInstagram />
              </Link>
            </div>
            <div className="Seccion1_Abierto">
              <h2>Horario de atención</h2>
            </div>
            <div className="Seccion1_Horario2">
              <h2>{negocioData.horario_apertura}</h2>
              <div className="Raya_Horario"></div>
              <h2>{negocioData.horario_cierre}</h2>
            </div>
            <div className="Seccion1_NegocioInfo">
              <p>{negocioData.ubicacion}</p>
              <p>{negocioData.telefono}</p>
              <p>{negocioData.correo}</p>
            </div>
            <div className="Seccion1_NegocioCalf">
              <div className="Estrellas_Contenedor">
                <Estrellas_Calf calificacion={negocioData.promedio_estrellas || 0} />
              </div>
            </div>
          </div>

          <div className="Negocio_Seccion1_Der">
            <div className="Mapa_Contenedor">
              {/*===================================================================
                Aqui es el espacio para colocar el mapa con la direccion del negocio
                Es el cuadrito azul a un lado de la info del negocio
                 ================================================================*/}
            </div>
          </div>
        </div>
        <div className="Negocio_Seccion2">
          <div className="Negocio_Seccion2_Izq"></div>
          <div className="Negocio_Seccion2_Der">
            <div className="Conocenos">
              <h2>Ven y Conócenos!</h2>
            </div>
            <div className="Msj_Menu">
              <h3>{negocioData.msj_menu || "Descubre nuestro menú"}</h3>
            </div>
            <div className="Galeria_Menu_Contenedor">
              <div className="Tarjeta_Menu">
                <Image
                  src={negocioData.imagenes[0] || "/assets/Negocio/default.jpg"}
                  alt="Imagen del negocio"
                  width={300}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Negocio_Seccion3">
          <div className="Seccion3_Izq">
            <h4>Cuéntanos tu experiencia</h4>
          </div>
          <div className="Seccion3_Der">
            <div className="Contenedor_InputEstrellas">
              <Estrellas_Calf calificacion={negocioData.calificacion} />
            </div>
            <div className="Seccion3_Comentario">
              <textarea
                className="Caja_Comentario"
                placeholder="Añade un comentario"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="Comentario_Botones">
                <div className="Btn_Añadir_Imagen">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    onChange={handleImageChange}
                    className="Imagen_Input"
                  />
                  <label htmlFor="fileInput" className="Clip_Icono">
                    <FaPaperclip />
                  </label>
                  {image && (
                    <div className="Previsualizacion_Img">
                      <img src={image} alt="Preview" className="Prev_Imagen" />
                      <button onClick={removeImage} className="Eliminar_Imagen">
                        <FaTimesCircle />
                      </button>
                    </div>
                  )}
                </div>
                <button
                  className="Btn_Enviar_Comentario"
                  onClick={handleSubmit}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Negocio_Seccion4">
          <div className="Seccion4_sombra"></div>
          <div className="Negocio_Comentarios">
            <div className="Negocio_Comentarios_Contenedor">
              {negocioData.imagenes.map((imagen, index) => (
                <div key={index} className="Imagen_Menu">
                  <Image
                    src={`/assets/Negocio/${imagen}`}
                    alt={`Imagen ${index + 1}`}
                    width={300}
                    height={400}
                  />
                </div>
              ))}
              <Comentarios
                Img_Ruta={Img_Ruta}
                Img_User={Img_User}
                User={User}
                Calificacion={Calificacion}
                Comentario={Comentario}
              />
              <Comentarios
                Img_Ruta={Img_Ruta}
                Img_User={Img_User}
                User={User}
                Calificacion={Calificacion}
                Comentario={Comentario}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}