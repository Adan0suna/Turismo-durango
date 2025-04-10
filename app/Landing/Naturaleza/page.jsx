import "./Naturaleza.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Tarjetas_Naturaleza_Izq from "../../../components/Tarjetas_Naturaleza/Tarjetas_Naturaleza_Izq";
import Tarjetas_Naturaleza_Der from "../../../components/Tarjetas_Naturaleza/Tarjetas_Naturaleza_Der";

export default function Naturaleza() {
    var N_Nombre = "CAÑON AZUL";
    var N_Descripcion = "Se encuentra en el municipio de Nuevo Ideal, en el ejido El Molino, aproximadamente a una hora y media de la ciudad de Durango. Este cañón es famoso por sus impresionantes formaciones rocosas y cuerpos de agua de color azul cristalino que contrastan con el paisaje semidesértico circundante.​";
    var N_Fondo1 = "Cañon_Azul.jpg";
    var N_Fondo2 = "Cañon_Azul2.jpg";
    var N_Fondo3 = "Cañon_Azul3.jpg";

    var N_Nombre2 = "ESTACION PATOS";
    var N_Descripcion2 = "Ahora conocido como el municipio de Nuevo Ideal esta zona rodeada de cerros en medio de una llanura plana cuenta con dos embalses; Laguna de Santiaguillo y Persa el Tejamen, que por su cercanía te brindan​";
    var N_Fondo12 = "Estacion_Patos.jpg";
    var N_Fondo22 = "Estacion_Patos2.jpg";
    var N_Fondo32 = "Estacion_Patos3.jpg";

    var N_Nombre3 = "LABERINTO DE LAVA";
    var N_Descripcion3 = "Hace miles de millones de años, las estructuras montañosas de la Sierra Madre Oriental. En el proceso, crearon cúmulos de lava que con los años se petrificaron y formaron uno de los escenarios naturales más impresionantes de México, conocido actualmente como el Jardín de Piedra.​";
    var N_Fondo13 = "Laberinto_Lava.jpg";
    var N_Fondo23 = "Laberinto_Lava2.jpg";
    var N_Fondo33 = "Laberinto_Lava3.jpg";

    var N_Nombre4 = "RUTA DEL QUESO";
    var N_Descripcion4 = "La región menonita de la zona de Durango es un lugar lleno de contrastes y valles donde las los clarobscuros de las tardes brindan una nostalgia muy peculiar de la zona. ​";
    var N_Fondo14 = "Ruta_Queso.jpg";
    var N_Fondo24 = "Ruta_Queso2.jpg";
    var N_Fondo34 = "Ruta_Queso3.jpg";

    return(
        <>
            <Navbar/>
            <div className="Naturaleza_Contenedor">
                <div className="Naturaleza_Fondo">
                    <div className="Msj_Naturaleza">
                        <h1>LUGARES NATURALES</h1>
                        <h2>DE</h2>
                        <h3>DURANGO</h3>
                    </div>
                </div>

                <div className="Naturaleza_Seccion1">
                    <Tarjetas_Naturaleza_Izq Naturaleza_Nombre={N_Nombre} Naturaleza_Descripcion={N_Descripcion} Naturaleza_Fondo1={N_Fondo1} Naturaleza_Fondo2={N_Fondo2} Naturaleza_Fondo3={N_Fondo3}/>
                    <Tarjetas_Naturaleza_Der Naturaleza_Nombre={N_Nombre2} Naturaleza_Descripcion={N_Descripcion2} Naturaleza_Fondo1={N_Fondo12} Naturaleza_Fondo2={N_Fondo22} Naturaleza_Fondo3={N_Fondo32}/>
                    <Tarjetas_Naturaleza_Izq Naturaleza_Nombre={N_Nombre3} Naturaleza_Descripcion={N_Descripcion3} Naturaleza_Fondo1={N_Fondo13} Naturaleza_Fondo2={N_Fondo23} Naturaleza_Fondo3={N_Fondo33}/>
                    <Tarjetas_Naturaleza_Der Naturaleza_Nombre={N_Nombre4} Naturaleza_Descripcion={N_Descripcion4} Naturaleza_Fondo1={N_Fondo14} Naturaleza_Fondo2={N_Fondo24} Naturaleza_Fondo3={N_Fondo34}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}