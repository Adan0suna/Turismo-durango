"use client";
import { useState } from "react"; 
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./globals.css"
import Image from "next/image";
import { useRouter } from "next/navigation"; 

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const router = useRouter();

  const activar = () => {
    setIsActive(true);
  }
  const desactivar = () => setIsActive(false);

  const handleRegistro = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nombre,
          email: correo,
          password: contraseña,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message); 
        setNombre('');
        setCorreo('');
        setContraseña('');
      } else {
        const errorData = await response.json();
        alert(errorData.message); 
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Ocurrió un error al registrar el usuario.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: correo,
          password: contraseña,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        
        // Guardar el token y esperar a que se complete
        await new Promise((resolve) => {
          localStorage.setItem('token', data.token);
          resolve();
        });

        // Verificar que el token se guardó correctamente
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Error al guardar el token');
        }

        // Redirigir después de asegurarnos que el token está guardado
        router.push('/Landing');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión.');
    }
  };

  return (
    <>
        <div className={`Contenedor ${isActive ? "active" : ""}`}>
          <div className="Imagen">
            <div className="Fondo">
              <Image 
                src="/assets/Login/fondo.jpg" 
                alt="Fondo"
                layout="fill"
                className="Fondo-img"/>
            </div>
          </div>
          <div className="Registro">
            <div className="Titulo">
              <h1>Registro</h1>
            </div>
            <div className="Formulario2">
              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
              <button className="Btn_Formulario_R" onClick={handleRegistro}>Registrate</button>
            </div>
          </div>
          <div className="Msj_Login">
            <h6>¡Bienvenido de nuevo!</h6>
            <h4>¿Ya tienes una cuenta?</h4>
            <div className="Cambio_a_registro">
              <button onClick={desactivar}>Inicia Sesion</button>
            </div>
          </div>
          <div className="Msj_Registro">
            <h3>Hola, ¡Bienvenido!</h3>
            <h4>¿No tienes una cuenta?</h4>
            <div className="Cambio_a_registro">
              <button onClick={activar}>Registrate</button>
            </div>
          </div>
          <div className="Login">
            <div className="Titulo">
              <h1>Inicio de Sesion</h1>
            </div>
            <div className="Formulario">
              <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              <input type="Password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
              <button className="Recuperar">¿Olvidaste tu contraseña?</button>
              <button className="Btn_Formulario" onClick={handleLogin}>Inicia Sesion</button>
            </div>
          </div>
        </div>
    </>
  );
}
