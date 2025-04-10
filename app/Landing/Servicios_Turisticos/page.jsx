"use client";
  
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Servicios_Turisticos.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
 
export default function Turismo() {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <Navbar/>
            <div className="Servicios_Contenedor">
                <div className="Fondo">
                    <div className="Fondo_SB">
                        <Image
                            src="/assets/Login/Fondo.jpg"
                            alt="Fondo"
                            layout="fill"
                            objectFit="cover"
                            className="Img_Fondo_SB"
                        />
                    </div>
                    <div className="Fondo_CB">
                        <Image
                            src="/assets/Login/Fondo2.jpg"
                            alt="Fondo"
                            layout="fill"
                            objectFit="cover"
                            className="Img_Fondo_CB"
                        />
                    </div>
                    <div className="Texto">
                        <div className="Servicios">
                            <span className="Msj_1">SERVICIOS</span>
                        </div>
                        <div className="Turisticos">
                            <span className="Msj_3">TURIS</span>
                            <span className="Msj_4">TICOS</span>
                        </div>
                    </div>
                </div> 

                <div className="Categorias">
                    <div className="Ctg_Contenedor">
                        <div className="colornegro">
                            <Link href="./Naturaleza" className="Tarjeta Natur">
                                <div className="Img_Texto">
                                    <p>NATURALEZA AVENTURA</p>
                                </div> 
                            </Link>
                        </div>
                        <div className="colornegro">
                            <Link href="./Hoteleria" className="Tarjeta Hotel">
                                <div className="Img_Texto">
                                    <p>HOTELERIA</p>
                                </div> 
                            </Link>
                        </div>
                        <div className="colornegro">
                            <Link href="./Gastronomia" className="Tarjeta Gastro">
                                <div className="Img_Texto">
                                    <p>GASTRONOMIA</p>
                                </div> 
                            </Link>
                        </div>
                        <div className="colornegro">
                            <Link href="./Historia" className="Tarjeta Histo">
                                <div className="Img_Texto">
                                    <p>HISTORIA</p>
                                </div> 
                            </Link>
                        </div>
                        
                    </div>
                </div>

                <div className="Foot1">
                    <Footer/>
                </div>
            </div>
        </>
    )
}