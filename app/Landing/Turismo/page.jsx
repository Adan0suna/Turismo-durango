"use client";

import { useState } from "react";
import Image from "next/image";
import "./Turismo.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function Turismo() {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <Navbar/>
            <div className="Contenedor">
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
                            <span className="Msj_1">SERVICIO</span>
                            <span className="Msj_2">S</span>
                        </div>
                        <div className="Turisticos">
                            <span className="Msj_3">TURIS</span>
                            <span className="Msj_4">TICOS</span>
                        </div>
                    </div>
                </div>
                <div className="Categorias">
                    <div className={`Ctg_Contenedor ${isActive ? "active" : ""}`}>
                        <div className="Encabezado">
                            <input type="text" placeholder="¿QUÉ ESTAS BUSCANDO?"/>
                            <button>BUSCAR</button>
                        </div>
                        <div className="Tar_Contenedor">
                            <button className="Tarjeta">
                                <Image
                                    src="/assets/ST/Transporte.jpg"
                                    alt="Transporte"
                                    width={400}
                                    height={470}
                                    className="Img_Tarjeta"
                                />
                                <div className="Img_Texto">
                                    <p>TRANSPORTE</p>
                                </div> 
                            </button>
                            <div className="Tarjeta">
                                <Image
                                    src="/assets/ST/Servicios.jpg"
                                    alt="Servicios"
                                    width={400}
                                    height={470}
                                    className="Img_Tarjeta"
                                />
                                <div className="Img_Texto">
                                    <p>SERVICIOS</p>
                                </div> 
                            </div>
                            <div className="Tarjeta">
                                <Image
                                    src="/assets/ST/Naturaleza.jpg"
                                    alt="Naturaleza"
                                    width={400}
                                    height={470}
                                    className="Img_Tarjeta"
                                />
                                <div className="Img_Texto Natu">
                                    <p>NATURALEZA<br/>ADVENTURA</p>
                                </div> 
                            </div>
                            <div className="Tarjeta">
                                <Image
                                    src="/assets/ST/Hoteleria.jpg"
                                    alt="Hoteleria"
                                    width={400}
                                    height={470}
                                    className="Img_Tarjeta"
                                />
                                <div className="Img_Texto">
                                    <p>HOTELERIA</p>
                                </div> 
                            </div>
                            <div className="Tarjeta">
                                <Image
                                    src="/assets/ST/Gastronomia.jpg"
                                    alt="Gastronomia"
                                    width={400}
                                    height={470}
                                    className="Img_Tarjeta"
                                />
                                <div className="Img_Texto">
                                    <p>GASTRONOMIA</p>
                                </div> 
                            </div>
                            <div className="Tarjeta">
                                <Image
                                    src="/assets/ST/Historia.jpg"
                                    alt="Historia"
                                    width={400}
                                    height={470}
                                    className="Img_Tarjeta"
                                />
                                <div className="Img_Texto">
                                    <p>HISTORIA</p>
                                </div> 
                            </div>
                            <div className="Tarjeta Cine">
                                <Image
                                    src="/assets/ST/Cinematografia.jpg"
                                    alt="Cinematografia"
                                    width={400}
                                    height={470}
                                    className="Img_Tarjeta"
                                />
                                <div className="Img_Texto">
                                    <p>CINEMATOGRAFIA</p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    )
}