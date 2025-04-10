"use client";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import "./Navbar.css"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const validateToken = () => {
            const token = localStorage.getItem('token');
            console.log('Token JWT:', token);
            
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const decoded = jwtDecode(token);
                console.log('Token decodificado:', decoded);
                const currentTime = Date.now() / 1000;
                
                if (decoded.exp < currentTime) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    return;
                }

                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error al validar token:', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        };

        validateToken();
    }, []);

    return (
        <nav className="Barra">
            <div className="Opciones">
                <div><Link href="/Landing" className="opcion final">INICIO</Link></div>
                <div><Link href="/Landing/Naturaleza" className="opcion medio">NATURALEZA</Link></div>
                <div><Link href="/Landing/Servicios_Turisticos" className="opcion centro">SERVICIOS TURISTICOS</Link></div>
                <div className="Img_Logo">
                    <Image 
                        src="/assets/Dgo_Logo.png" 
                        alt="Logo"
                        width={150}
                        height={70}
                    />
                </div>
                <div><Link href="/Landing/Gastronomia" className="opcion centro">GASTRONOMIA</Link ></div>
                <div><Link href="/Landing/Hoteleria" className="opcion medio">HOTELERIA</Link></div>
                <div><Link href={isAuthenticated ? "/Perfil" : "/Login"} className="opcion final">PERFIL</Link></div>
            </div>
        </nav>  
    )
}