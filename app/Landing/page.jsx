/*=============
Cositas de Next
=============*/
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

/*=====
Estilos
=====*/
import "./landing.css"
import { FaSearch } from "react-icons/fa";

/*=========
Componentes
=========*/
import Navbar from "../../components/Navbar/Navbar";
import Carrusel from "../../components/Carrusel_N/Carrusel_N";
import Estrellas_Calf from "../../components/Estrellas/Estrellas";
import Tarjeta_Clima from "../../components/Tarjeta_Clima/Tarjeta_Clima";
import Comentarios from "../../components/Comentarios/Comentarios";
import Footer from "../../components/Footer/Footer";
import Galeria_Gastronomia from "../../components/Galeria_Gastronomia/Galeria_Gastronomia";
import Tarjetas_Restaurantes from "../../components/Tarjetas_Restaurantes/Tarjetas_Restaurantes";
 

export default function Landing_Page (){
    const [modalActivo, setModalActivo] = useState(false);
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        async function fetchComentarios() {
            try {
                const response = await fetch("/api/comments");
                const data = await response.json();
                setComentarios(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        fetchComentarios();
    }, []);

/*===================================
=====================================
             IMPORTANTE
Las siguientes variables son solo de 
ejemplo, cuando le metan back 
reemplazen las variables por los
datos de la bd :)
=====================================
===================================*/

/*=====================================
Mensaje diapositiva Historia de Durango
(El admin puede cambiar el mensaje)
=====================================*/
    var Msj_Historia = "Conoce a Durango a través de los monumentos y atracciones de la historia de Durango.";

/*==================================
Variables de diapositiva Gastronomia
(Imagen, Nombre y Calificacion)
==================================*/
    var Img_Restaurante1 = "tarjeta1.jpg";
    var Img_Restaurante2 = "tarjeta2.jpg";
    var Img_Restaurante3 = "tarjeta3.jpg";

    var Nom_Restaurante1 = "Barocco";
    var Nom_Restaurante2 = "Casa Abuela";
    var Nom_Restaurante3 = "Mendoza";

    var Calf_Restaurante1 = "4";
    var Calf_Restaurante2 = "2";
    var Calf_Restaurante3 = "5";

/*=================================
Variables de diapositiva Naturaleza
(Si, puse lo mismo en las 3 tarjetas)
=================================*/
    var Img_HotTours = "Img_Hot1.jpg";
    var Nom_HotTours = "Rancho La Muralla";
    var Calf_HotTours = "4";

/*==================================
Imagenes para el carrusel de cabañas
(se pueden agregar mas o quitar)
==================================*/
    var images = [
        "/assets/Landing/cabañas1.jpg",
        "/assets/Landing/cabañas2.jpg",
        "/assets/Landing/cabañas3.jpg"
    ];

/*================================
Las constantes no las modifiquen
(A menos de que sea muy necesario
solo me avisan antes de hacerlo)
================================*/

/*==================================
Funcionalidad del carrusel principal
==================================*/
    const [indice, setIndice] = useState(0);

/*==============================
Estructura de cada "diapositiva"
==============================*/
    const diapositivas = [ 
            <div className="Historia">
                <div className="Titulo">HISTORIA DE DURANGO</div>
                <div className={`BusquedaContainer ${modalActivo ? "active" : ""}`} onClick={() => setModalActivo(!modalActivo)}>
                    <div className="Circulo_Ext">
                        <div className="Circulo_Int">
                            <div className="Busqueda">
                                <FaSearch size={40} />
                            </div>
                        </div>
                        <div className="midal">
                            <div className="modal-content">
                                <h3>{Msj_Historia}</h3>
                                <Link href="./">Conocer más...</Link>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>,
            <div className="Gastronomia">
                <div className="Izquierda">
                    <div className="Titulo2">GASTRONOMIA DE DURANGO</div>
                    <div className="Msj_GastronomiaL">El mejor sazón de Durango</div>
                    <div className="Res_Tarjetas">
                        <Tarjetas_Restaurantes Img_Restaurantes={Img_Restaurante1} Restaurantes_Nombres={Nom_Restaurante1} Restaurantes_Calificacion={Calf_Restaurante1}/>
                        <Tarjetas_Restaurantes Img_Restaurantes={Img_Restaurante2} Restaurantes_Nombres={Nom_Restaurante2} Restaurantes_Calificacion={Calf_Restaurante2}/>
                        <Tarjetas_Restaurantes Img_Restaurantes={Img_Restaurante3} Restaurantes_Nombres={Nom_Restaurante3} Restaurantes_Calificacion={Calf_Restaurante3}/>
                    </div>
                </div>
                <div className="Derecha2">
                    <Galeria_Gastronomia/>
                </div>
            </div>,
            <div className="Naturaleza">
                <div className="Titulo3">NATURALEZA Y AVENTURA</div>
                <div className="abajo">
                    <div className="Carrusel">
                        <Carrusel images={images} />
                    </div>
                    <div className="Hot_Tours">
                        <div className="Titulo_Hot">HOT TOURS</div>
                        <div className="Tarjetas_Hot">
                            <div className="Tarjeta_H">
                                <div className="Imagen_H">
                                    <Image
                                        src={"/assets/Landing/" + Img_HotTours}
                                        alt="Transporte"
                                        width={1000}
                                        height={1000}
                                        className="Img_Hot"
                                    />
                                </div>
                                <div className="Info_Hot">
                                    <div className="Nombre_Hot">{Nom_HotTours}</div>
                                    <div className="Estrellas"><Estrellas_Calf calificacion={Calf_HotTours}/></div>
                                    <div className="Abajo_Hot"><Link href="../Negocio" className="Mas_Hot">Mas Info</Link></div>   
                                </div>
                            </div>
                            <div className="Tarjeta_H">
                                <div className="Imagen_H">
                                    <Image
                                        src={"/assets/Landing/" + Img_HotTours}
                                        alt="Transporte"
                                        width={1000}
                                        height={1000}
                                        className="Img_Hot"
                                    />
                                </div>
                                <div className="Info_Hot">
                                    <div className="Nombre_Hot">{Nom_HotTours}</div>
                                    <div className="Estrellas"><Estrellas_Calf calificacion={Calf_HotTours}/></div>
                                    <div className="Abajo_Hot"><Link href="../Negocio" className="Mas_Hot">Mas Info</Link></div>   
                                </div>
                            </div>
                            <div className="Tarjeta_H">
                                <div className="Imagen_H">
                                    <Image
                                        src={"/assets/Landing/" + Img_HotTours}
                                        alt="Transporte"
                                        width={1000}
                                        height={1000}
                                        className="Img_Hot"
                                    />
                                </div>
                                <div className="Info_Hot">
                                    <div className="Nombre_Hot">{Nom_HotTours}</div>
                                    <div className="Estrellas"><Estrellas_Calf calificacion={Calf_HotTours}/></div>
                                    <div className="Abajo_Hot"><Link href="../Negocio" className="Mas_Hot">Mas Info</Link></div>   
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    ]

/*========================================
Mas funcionalidades del carrusel principal
========================================*/
const getSlides = () => {
    return [
        diapositivas[(indice + 0) % diapositivas.length],
        diapositivas[(indice + 1) % diapositivas.length],
        diapositivas[(indice + 2) % diapositivas.length]
    ].map((slide, idx) => <div key={idx}>{slide}</div>);
};

/*==================
Función para avanzar
==================*/
    const siguiente = () => {
        setIndice((prev) => (prev + 1) % diapositivas.length);
    };

/*=====================
Función para retroceder
=====================*/
    const anterior = () => {
        setIndice((prev) => (prev - 1 + diapositivas.length) % diapositivas.length);
    };

/*=====================
Temporizador automático
=====================*/
    useEffect(() => {
        const intervalo = setInterval(siguiente, 30000);
        return () => clearInterval(intervalo);
    }, []);

/*=========================================
Aqui ya empieza la estructura de la Landing
=========================================*/
    return (
        <>
            <Navbar/>
            <div className="Landing_Contenedor">
                <div className="Contenedor">        
                    <div className="Mensaje">
                        <div><h1 className="descubre">DESCUBRE</h1></div>    
                        <div className="texto-imagen">DURANGO</div>
                    </div>
                </div>
                <div className="carrusel_completo">
                    <div className="contenedor_carrusel">
                        {getSlides()}
                    </div>
                    <div className="btns_contenedor">
                        <button onClick={anterior} className="boton_carrusel">&lt;</button>
                        <button onClick={siguiente} className="boton_carrusel">&gt;</button>
                    </div>
                </div>
                <div className="Clima">
                    <div className="Titulo_Clima">
                        <h2>Cuando Visitar</h2>
                    </div>
                    <div className="Tarjetas_Clima">
                        <Tarjeta_Clima Mes="Enero" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Febrero" Temperatura="29°C" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Marzo" Temperatura="35°C" Dias_LLuvia="5 dias de lluvias" Ocupacion="Mes moderado"/>
                        <Tarjeta_Clima Mes="Abril" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Mayo" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Junio" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Julio" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Agosto" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Septiembre" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Octubre" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Noviembre" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                        <Tarjeta_Clima Mes="Diciembre" Temperatura="26°C mes mas frio" Dias_LLuvia="6 dias de lluvias" Ocupacion="Mes menos ocupado"/>
                    </div>
                </div>
                <div className="Comentarios">
                    <div className="Comentarios_Contenedor">
                        {comentarios.map((comentario, index) => (
                            <Comentarios
                                key={index}
                                Img_Ruta={comentario.imagen_usuario || "default.jpg"}
                                Img_User={comentario.imagen_usuario || "default.jpg"}
                                User={comentario.nombre_usuario}
                                Calificacion={comentario.estrellas}
                                Comentario={comentario.comentario}
                            />
                        ))}
                    </div>
                </div>

                <div className="Foot">
                    <Footer/>
                </div>
            </div>
        </>
    )
}
