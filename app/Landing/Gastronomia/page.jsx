"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import "./Gastronomia.css";
import Image from "next/image";

import Navbar from "../../../components/Navbar/Navbar";
import Estrellas_Calf from "../../../components/Estrellas/Estrellas";
import Tarjetas_Restaurantes from "../../../components/Tarjetas_Restaurantes/Tarjetas_Restaurantes";
import Footer from "../../../components/Footer/Footer";

const items = [
    {
        id: 2,
        title: "Card 2",
        description: "",
        backgroundImage: "/assets/Restaurantes/GaleriaEscalonada2.jpg",
    },
    {
        id: 3,
        title: "Card 3",
        description: "",
        backgroundImage: "/assets/Restaurantes/GaleriaEscalonada3.jpg",
    },
    {
        id: 4,
        title: "Card 4",
        description: "",
        backgroundImage: "/assets/Restaurantes/GaleriaEscalonada4.jpg",
    },
    {
        id: 5,
        title: "Card 5",
        description: "",
        backgroundImage: "/assets/Restaurantes/GaleriaEscalonada5.jpg",
    },
    {
      id: 1,
      title: "Platillos Tipicos",
      description: "",
      backgroundImage: "/assets/Restaurantes/GaleriaEscalonada1.jpg",
    }
];

export default function Gastronomia() {
    const [order, setOrder] = useState(items);
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const seccion2Ref = useRef(null)
    const seccion3Ref = useRef(null)
    const seccion4Ref = useRef(null)
    const seccion4TRRef = useRef(null)

    useEffect(() => {
        const fetchTopRestaurants = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/top-restaurants');
                if (!response.ok) {
                    throw new Error('Error al obtener los restaurantes');
                }
                const data = await response.json();
                setTopRestaurants(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar los restaurantes.');
            } finally {
                setLoading(false);
            }
        };

        fetchTopRestaurants();
    }, []);

    const handleClick = () => {
        setOrder((prev) => [...prev.slice(1), prev[0]]);
    };

    return(
        <>
            <Navbar/>
            <div className="Gastronomia_Contenedor">
                <div className="Gastronomia_Fondo">
                    <div className="Msj_Gastronomia">
                        <h1>GASTRONOMIA EN</h1>
                        <h2>DURANGO</h2>
                        <div className="Msj_Fondo">
                            <p>El descubrimiento de la gastronomia de Durango atravez de la cocina de sus diveros restaurantes de la ciudad</p>
                        </div>
                    </div>
                </div>
                <div className="Gastronomia_Seccion1">
                    <div className="Seccion1_Izq">
                        <div className="Seccion1_Cuadro">
                            <div className="Gastronomia_Titulos" onClick={() => seccion2Ref.current.scrollIntoView({ behavior: "smooth" })}>
                                <h3>Platos Tipicos</h3>
                                <p>Descripcion de la seccion de platos tipicos</p>
                            </div>
                            <div className="Gastronomia_Titulos" onClick={() => seccion3Ref.current.scrollIntoView({ behavior: "smooth" })}>
                                <h3>Bebidas y Postres</h3>
                                <p>Descripcion</p>
                            </div>
                            <div className="Gastronomia_Titulos" onClick={() => seccion4Ref.current.scrollIntoView({ behavior: "smooth" })}>
                                <h3>Donde Comer</h3>
                                <p>Descripcion</p>
                            </div>
                        </div>
                    </div>
                    <div className="Seccion1_Der">
                        <div className="Seccion1_Imagen1_Gastronomia">
                            <Image
                                src="/assets/Restaurantes/Img_Gastronomia1.jpg"
                                alt="Gastronomia"
                                width={500}
                                height={700}
                                className="Seccion1_Img_Gastronomia"
                            />
                        </div>
                        <div className="Seccion1_Imagen2_Gastronomia">
                            <Image
                                src="/assets/Restaurantes/Img_Gastronomia2.jpg"
                                alt="Gastronomia"
                                width={400}
                                height={500}
                                className="Seccion1_Img_Gastronomia"
                            />
                        </div>
                    </div>
                </div>
                <div className="Gastronomia_Seccion2" ref={seccion2Ref}>
                <div className="gallery-container" onClick={handleClick}>
                    {order.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="gallery-item"
                            layout
                            initial={{ x: -100 * (items.length - index - 1) }}
                            animate={{ x: -100 * (items.length - index - 1) }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            style={{
                                backgroundImage: `url(${item.backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="overlay">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                </div>
                <div className="Gastronomia_Seccion2-2">
                    <div className="Seccion2-2_Izq">
                        <div className="Seccion2-2_Titulo">
                            <h4>Platos tradicionales</h4>
                        </div>
                        <div className="Seccion2-2_Tarjetas_Platillos">
                            <div className="Tarjeta_Platillos">
                                <div className="Platillos_Imagen">
                                    <Image
                                        src="/assets/Restaurantes/Tarjeta_Platillos1.jpg"
                                        alt="Gastronomia"
                                        width={110}
                                        height={110}
                                        className="Img_Tarjeta_Platillos"
                                    />
                                </div>
                                <div className="Platillos_Nombre">
                                    <h5>Mole</h5>
                                    <p>Descripcion del mole</p>
                                </div>
                            </div>
                            <div className="Tarjeta_Platillos">
                            <div className="Platillos_Imagen">
                                    <Image
                                        src="/assets/Restaurantes/Tarjeta_Platillos2.jpg"
                                        alt="Gastronomia"
                                        width={110}
                                        height={110}
                                        className="Img_Tarjeta_Platillos"
                                    />
                                </div>
                                <div className="Platillos_Nombre">
                                    <h5>Pozole</h5>
                                    <p>Descripcion del pozole</p>
                                </div>
                            </div>
                            <div className="Tarjeta_Platillos">
                            <div className="Platillos_Imagen">
                                    <Image
                                        src="/assets/Restaurantes/Tarjeta_Platillos3.jpg"
                                        alt="Gastronomia"
                                        width={110}
                                        height={110}
                                        className="Img_Tarjeta_Platillos"
                                    />
                                </div>
                                <div className="Platillos_Nombre">
                                    <h5>Caldillo durangueño</h5>
                                    <p>Descripcion del caldillo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Raya"></div>
                    <div className="Seccion2-2_Der">
                        <div className="Seccion2-2_Titulo">
                            <h4>Carnes y Asados</h4>
                        </div>
                        <div className="Seccion2-2_Tarjetas_Platillos2">
                            <div className="Tarjeta_Platillos">
                                <div className="Platillos_Imagen">
                                    <Image
                                        src="/assets/Restaurantes/Tarjeta_Platillos4.jpg"
                                        alt="Gastronomia"
                                        width={110}
                                        height={110}
                                        className="Img_Tarjeta_Platillos"
                                    />
                                </div>
                                <div className="Platillos_Nombre">
                                    <h5>Barbacoa</h5>
                                    <p>Descripcion de la barbacoa</p>
                                </div>
                            </div>
                            <div className="Tarjeta_Platillos">
                            <div className="Platillos_Imagen">
                                    <Image
                                        src="/assets/Restaurantes/Tarjeta_Platillos5.jpg"
                                        alt="Gastronomia"
                                        width={110}
                                        height={110}
                                        className="Img_Tarjeta_Platillos"
                                    />
                                </div>
                                <div className="Platillos_Nombre">
                                    <h5>Cochinita Pibil</h5>
                                    <p>Descripcion de la cochinita pibli</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Gastronomia_Seccion3" ref={seccion3Ref}>
                    <div className="Seccion3_Titulo">
                        <h6>Bebidas y Postres</h6>
                    </div>
                    <div className="Seccion3_Tarjeta1">
                        <div className="Bebidas_Img">
                            <Image
                                src="/assets/Restaurantes/Postres_Bebidas1.jpg"
                                alt="Gastronomia"
                                width={400}
                                height={550}
                            />
                        </div>
                        <div className="Bebidas_Info">
                            <div className="Postres_Nombre">
                                <h6>MEZCAL</h6>
                            </div>
                            <div className="Postres_Descripcion">
                                Siete estados de la republica tienen la denominación de origen en 
                                la producción de esta bebida precolombina, pero como el 
                                de Durango ninguno. Y es que son varias las características que 
                                vuelven único al mezcal duranguense, desde que es elaborado  
                                mayormente de forma  artesanal, que el agave es endémico de 
                                la región  (agave Durangensis), y al sabor peculiar que genera 
                                el método de cocimiento de las piñas del agave.  De sabor 
                                intenso, pero completo en aromas y sabores a humo, madera y 
                                quiote, es un deleite solo o acompañado con un poco de 
                                naranja.  Existen diversos recorridos a las principales vinatas 
                                artesanales de  la villa de Nombre de Dios, la cual se encuentra 
                                a tan  solo 40 minutos de la capital.
                            </div>
                        </div>
                    </div>

                    <div className="Seccion3_Tarjeta1">
                        <div className="Bebidas_Info2">
                            <div className="Postres_Descripcion2">
                                Más de 120 años de tradición respaldan el sabor 
                                inigualable de las nieves Chepo.  Se trata de nieves de 
                                garrafa con sabores únicos y una textura más cremosa 
                                que las nieves tradicionales.  Se originaron en  Ciudad 
                                Lerdo dentro de la laguna duranguense, pero  hoy en día 
                                se pueden  degustar en las plazas y parques de las 
                                principales ciudades del estado.  Es tradicional el ir 
                                en familia a degustar las deliciosas nieves de sabores 
                                naturales y originales.  Si recorrerás  lerdo no olvides 
                                visitar la sucursal original ubicada en el parque victoria de 
                                esta ciudad.
                            </div>
                            <div className="Postres_Nombre2">
                                <h6>NIEVE CHEPO</h6>
                            </div>
                        </div>
                        <div className="Bebidas_Img">
                            <Image
                                src="/assets/Restaurantes/Postres_Bebidas2.jpg"
                                alt="Gastronomia"
                                width={400}
                                height={550}
                            />
                        </div>
                    </div>

                    <div className="Seccion3_Tarjeta1">
                        <div className="Bebidas_Img">
                            <Image
                                src="/assets/Restaurantes/Postres_Bebidas3.jpg"
                                alt="Gastronomia"
                                width={400}
                                height={550}
                            />
                        </div>
                        <div className="Bebidas_Info">
                            <div className="Postres_Nombre3">
                                <h6>PAN RANCHERO</h6>
                            </div>
                            <div className="Postres_Descripcion">
                                Como su nombre lo indica,  este pan tiene orígenes en los 
                                pueblos y ranchos ubicados  principalmente  a lo largo de 
                                la cordillera de la sierra madre.  Es parte del paisaje de las 
                                casas y haciendas antiguas la presencia  de un horno de  
                                adobe  donde se preparaban diferentes delicias como los 
                                son las semitas, la empanada, la gordita de horno y los 
                                maizcrudos.  Destacan  las empanadas rellenas de 
                                chilacayote, camote y cajeta de frutas (ates).  Por fortuna 
                                la costumbre de elaborar estos productos de manera 
                                tradicional no se ha perdido, se pueden encontrar en los 
                                mercados tradicionales, pueblos y carreteras de todo el 
                                estado.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Gastronomia_Seccion4">
                    <div className="Seccion4_Titulo1">
                        <div className="Seccion4_Raya"></div>
                        <h6>Donde Comer</h6>
                        <div className="Seccion4_Raya"></div>
                    </div>
                    <div className="Seccion4_Titulo2">
                        <h6>Los mejores restaurantes de la ciudad</h6>
                    </div>
                    <div className="Seccion4_Restaurantes">
                        <div className="Restaurantes_Izq">
                            <div
                className="Restaurantes_Tarjetas"
                onClick={() => seccion4TRRef.current.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="Imagen_Restaurantes">
                  <Image
                    src="/assets/Restaurantes/Restaurantes1.jpg"
                    alt="Restaurantes"
                    width={850}
                    height={400}
                    className="Img_Restaurantes"
                  />
                </div>
                <div className="Info_Restaurantes">
                  <h6>Restaurantes destacados</h6>
                  <Estrellas_Calf calificacion={4} />
                </div>
              </div>

              <div
                className="Restaurantes_Tarjetas"
                onClick={() => seccion4TRRef.current.scrollIntoView({ behavior: "smooth" })}
              >
                <div>
                  <Image
                    src="/assets/Restaurantes/Restaurantes2.jpg"
                    alt="Restaurantes"
                    width={850}
                    height={400}
                    className="Img_Restaurantes"
                  />
                </div>
                <div className="Info_Restaurantes">
                  <h6>Restaurantes Tradicionales</h6>
                </div>
              </div>
            </div>
            <div className="Restaurantes_Der chef-container">
              <div className="Imagen_Chef">
                <Image
                  src="/assets/Restaurantes/Restaurantes3.jpg"
                  alt="Restaurantes"
                  width={380}
                  height={1000}
                  className="Img_Chef"
                />
              </div>
            </div>
                        </div>
                        
                    </div>
                    <div className="Seccion4_TarjetasR" ref={seccion4Ref}>
                        <div className="Seccion4_Raya2"></div>
                        <div className="Seccion4_TR">
                            <div className="Seccion4_TR_Carousel">
                            {loading && <p>Cargando restaurantes...</p>} 
                            {error && <p style={{ color: 'red' }}>{error}</p>} 
                            {!loading && !error && topRestaurants.length > 0 ? (
                                topRestaurants.map((restaurant) => (
                                    <div className="carousel-item" key={restaurant.negocio_id}>
                                        <Tarjetas_Restaurantes 
                                            Img_Restaurantes={restaurant.imagen_negocio || "tarjeta_default.jpg"}
                                            Restaurantes_Nombres={restaurant.nombre_negocio}
                                            Restaurantes_Calificacion={restaurant.promedio_estrellas}
                                        />
                                    </div>
                                ))
                            ) : (
                                !loading && !error && <p>No hay restaurantes destacados por el momento.</p>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            
            <Footer/>
        </>
    )
}