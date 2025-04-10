import {FaFacebookF, FaInstagram} from "react-icons/fa";
import "./Footer.css";
import Image from "next/image";

export default function Footer() {
    return (
        <> 
            <footer>
                <div className="Arriba">
                    <div className="Img_Dgo">
                        <Image 
                            src="/assets/Dgo_Logo.png" 
                            alt="Logo"
                            width={200}
                            height={100}
                            className="Img_Logo"
                        />
                    </div>
                </div>
                <div className="Medio">
                    <div className="Infoo">
                        <p>Secretaria de Turismo
                            <br/>Lic. Armando del Castillo Franco Km 1.5. Parque Sahuatoba,
                            <br/>Lomas del Parque, C.P. 34100 Durango, Dgo. México
                            <br/>Tel. +52 (618) 1374362
                        </p>
                    </div>
                    <div className="Redes">
                        <div><FaFacebookF/></div>
                        <div><FaInstagram/></div>
                    </div>
                </div>
                <div className="Linea"></div>
                <div className="Abajo">
                    <div><p>Gobierno del Estado de Durango</p></div>
                    <div className="Aviso"><p>Aviso de Privacidad</p></div>
                </div>
            </footer>
        </>
    );
}