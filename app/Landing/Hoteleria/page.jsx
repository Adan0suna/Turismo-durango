import "./Hoteleria.css";

import Navbar from "../../../components/Navbar/Navbar";
import Tarjetas_Hoteleria_Der from "../../../components/Tarjetas_Hoteleria/Tarjetas_Hoteleria_Der";
import Footer from "../../../components/Footer/Footer";

import Tarjetas_Hoteleria_Izq from "../../../components/Tarjetas_Hoteleria/Tarjetas_Hoteleria_Izq";

export default function Hoteleria() {
    var Hotel_Nombre = "HOTEL VICTORIA EXPRESS";
    var Hotel_Info = "Descuento Genius.";
    var Hotel_Lista = [
        "Dispone de wifi gratuito.",
        "Incluye piscina ",
        "Desayuno",
        "Aire acondicionado."
    ]
    var Hotel_Calf = 4;
    var Hotel_Fotos = [
        "/assets/Hoteleria/Vic_Express.jpg",
        "/assets/Hoteleria/Vic_Express2.jpg",
        "/assets/Hoteleria/Vic_Express3.jpg"
    ]

    var Hotel_Nombre2 = "HOTEL MISION EXPRESS";
    var Hotel_Info2 = "Desayuno buffet incluido. Acceso a gimnasio y salón de eventos.";
    var Hotel_Lista2 = [
        "Microondas y refrigerador",
        "Ideal para viajeros de negocios"
    ]
    var Hotel_Calf2 = 3;
    var Hotel_Fotos2 = [
        "/assets/Hoteleria/mision_exp.jpg",
        "/assets/Hoteleria/mision_exp2.jpg",
        "/assets/Hoteleria/mision_exp3.jpg"
    ]

    var Hotel_Nombre3 = "HOTEL GOBERNADOR";
    var Hotel_Info3 = "Las habitaciones presentan una decoración colonial.";
    var Hotel_Lista3 = [
        "Dispone de wifi gratuito.",
        "Incluye piscina ",
        "Desayuno",
        "Aire acondicionado."
    ]
    var Hotel_Calf3 = 5;
    var Hotel_Fotos3 = [
        "/assets/Hoteleria/gobernador.png",
        "/assets/Hoteleria/gobernador2.jpg",
        "/assets/Hoteleria/gobernador3.jpg"
    ]

    var Hotel_Nombre4 = "HOTEL HAMPTON";
    var Hotel_Info4 = "Descuento Genius.";
    var Hotel_Lista4 = [
        "Dispone de wifi gratuito.",
        "Incluye piscina ",
        "Desayuno",
        "Aire acondicionado."
    ]
    var Hotel_Calf4 = 4;
    var Hotel_Fotos4 = [
        "/assets/Hoteleria/hampton.jpg",
        "/assets/Hoteleria/hampton2.jpg",
        "/assets/Hoteleria/hampton3.jpg"
    ]

    var Hotel_Nombre5 = "HOTEL FIESTA INN";
    var Hotel_Info5 = "Descuento Genius.";
    var Hotel_Lista5 = [
        "Dispone de wifi gratuito.",
        "Incluye piscina ",
        "Desayuno",
        "Aire acondicionado."
    ]
    var Hotel_Calf5 = 4;
    var Hotel_Fotos5 = [
        "/assets/Hoteleria/fiesta_inn.png",
        "/assets/Hoteleria/fiesta_inn2.jpg",
        "/assets/Hoteleria/fiesta_inn3.jpg"
    ]

    var Hotel_Nombre6 = "HOTEL ONE";
    var Hotel_Info6 = "Descuento Genius.";
    var Hotel_Lista6 = [
        "Dispone de wifi gratuito.",
        "Incluye piscina ",
        "Desayuno",
        "Aire acondicionado."
    ]
    var Hotel_Calf6 = 4;
    var Hotel_Fotos6 = [
        "/assets/Hoteleria/one.jpg",
        "/assets/Hoteleria/one2.jpg",
        "/assets/Hoteleria/one3.jpg"
    ]

    return (
        <>
            <Navbar/>
            <div className="Hoteleria_Contenedor">
                <div className="Hoteleria_Fondo">
                    <div className="Msj_Hoteleria">
                        <h1>HOTELES</h1>
                        <h2>DURANGO</h2>
                        <div className="MsjH_Fondo">
                            <p>Diferentes páginas y precios, para su convenencia.</p>
                        </div>
                    </div>
                </div>

                <div className="Hoteleria_Seccion1">
                    <Tarjetas_Hoteleria_Der Hotel_Nombre={Hotel_Nombre} Hotel_Info={Hotel_Info} Hotel_Lista={Hotel_Lista} Hotel_Calf={Hotel_Calf} Hotel_Fotos={Hotel_Fotos}/>
                    <Tarjetas_Hoteleria_Izq Hotel_Nombre={Hotel_Nombre2} Hotel_Info={Hotel_Info2} Hotel_Lista={Hotel_Lista2} Hotel_Calf={Hotel_Calf2} Hotel_Fotos={Hotel_Fotos2}/>
                    <Tarjetas_Hoteleria_Der Hotel_Nombre={Hotel_Nombre3} Hotel_Info={Hotel_Info3} Hotel_Lista={Hotel_Lista3} Hotel_Calf={Hotel_Calf3} Hotel_Fotos={Hotel_Fotos3}/>
                    <Tarjetas_Hoteleria_Izq Hotel_Nombre={Hotel_Nombre4} Hotel_Info={Hotel_Info4} Hotel_Lista={Hotel_Lista4} Hotel_Calf={Hotel_Calf4} Hotel_Fotos={Hotel_Fotos4}/>
                    <Tarjetas_Hoteleria_Der Hotel_Nombre={Hotel_Nombre5} Hotel_Info={Hotel_Info5} Hotel_Lista={Hotel_Lista5} Hotel_Calf={Hotel_Calf5} Hotel_Fotos={Hotel_Fotos5}/>
                    <Tarjetas_Hoteleria_Izq Hotel_Nombre={Hotel_Nombre6} Hotel_Info={Hotel_Info6} Hotel_Lista={Hotel_Lista6} Hotel_Calf={Hotel_Calf6} Hotel_Fotos={Hotel_Fotos6}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}