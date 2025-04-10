"use client"

import { useState, useRef, useEffect} from "react"
import Image from "next/image"
import "./usercss.css"

export default function Perfil() {
  // Estados para edición
  const [editando, setEditando] = useState(false)
  const [editandoPerfil, setEditandoPerfil] = useState(false)
  const [editandoFotoPerfil, setEditandoFotoPerfil] = useState(false)
  const [editandoColeccion, setEditandoColeccion] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState("")

  // Estados para datos del perfil
  const [nombre, setNombre] = useState("")
  const [ubicacion, setUbicacion] = useState("")
  const [fecha, setFecha] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [gustos, setGustos] = useState([])
  const [fotoPerfil, setFotoPerfil] = useState("/assets/Perfil/user.jpg")
  const [fotoFondo, setFotoFondo] = useState("/assets/Perfil/fon.png")
  
  // Estados para colección
  const [coleccion, setColeccion] = useState([])

  // Referencias para input de archivos
  const fotoPerfilInputRef = useRef(null)
  const fotoFondoInputRef = useRef(null)
  const fotoColeccionInputRef = useRef(null)

  // Función para subir una imagen al servidor
  const subirImagen = async (archivo) => {
    const formData = new FormData();
    formData.append('file', archivo);
    
    try {
      const response = await fetch('/api/perfil/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }
      
      const data = await response.json();
      return data.path;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw error;
    }
  };

  // Cargar datos del perfil al iniciar
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setCargando(true);
        // Obtener el ID del usuario de la sesión o localStorage
        const userId =  4; // Usar 2 como fallback
        
        const response = await fetch(`/api/perfil/${userId}`);
        if (!response.ok) {
          throw new Error('Error al cargar el perfil');
        }
        
        const data = await response.json();
        
        setNombre(data.nombre || "");
        setUbicacion(data.ubicacion || "");
        setFecha(data.fecha || "");
        setDescripcion(data.descripcion || "");
        setGustos(data.gustos || []);
        setFotoPerfil(data.fotoPerfil || "/assets/Perfil/user.jpg");
        setFotoFondo(data.fotoFondo || "/assets/Perfil/fon.png");
        setColeccion(data.coleccion || []);
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        setMensaje("Error al cargar el perfil. Por favor, inténtalo de nuevo.");
      } finally {
        setCargando(false);
      }
    };

    fetchProfile();
  }, []);

  // Funciones para toggle de edición
  const toggleEditar = () => {
    setEditando(!editando)
    if (!editando) {
      // Iniciar edición
      setEditandoPerfil(false)
      setEditandoFotoPerfil(false)
      setEditandoColeccion(false)
    }
  }

  const toggleEditarPerfil = () => {
    setEditandoPerfil(!editandoPerfil)
  }

  const toggleEditarFotoPerfil = () => {
    setEditandoFotoPerfil(!editandoFotoPerfil)
  }

  const toggleEditarColeccion = () => {
    setEditandoColeccion(!editandoColeccion)
  }

  // Funciones para manejo de cambios
  const handleNombreChange = (e) => {
    setNombre(e.target.value)
  }

  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value)
  }

  const handleFechaChange = (e) => {
    setFecha(e.target.value)
  }

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value)
  }

  const handleGustoChange = (index, value) => {
    const nuevosGustos = [...gustos]
    nuevosGustos[index] = value
    setGustos(nuevosGustos)
  }

  const agregarGusto = () => {
    setGustos([...gustos, "nuevo gusto"])
  }

  const eliminarGusto = (index) => {
    const nuevosGustos = [...gustos]
    nuevosGustos.splice(index, 1)
    setGustos(nuevosGustos)
  }

  // Funciones para manejo de imágenes
  const handleFotoPerfilChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        setCargando(true);
        // Mostrar vista previa inmediata
        const reader = new FileReader();
        reader.onload = (e) => {
          setFotoPerfil(e.target.result);
        };
        reader.readAsDataURL(file);
        
        // Subir al servidor
        const path = await subirImagen(file);
        setFotoPerfil(path);
        setMensaje("Foto de perfil actualizada correctamente");
      } catch (error) {
        console.error('Error al actualizar foto de perfil:', error);
        setMensaje("Error al actualizar la foto de perfil");
      } finally {
        setCargando(false);
      }
    }
  }

  const handleFotoFondoChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        setCargando(true);
        // Mostrar vista previa inmediata
        const reader = new FileReader();
        reader.onload = (e) => {
          setFotoFondo(e.target.result);
        };
        reader.readAsDataURL(file);
        
        // Subir al servidor
        const path = await subirImagen(file);
        setFotoFondo(path);
        setMensaje("Foto de fondo actualizada correctamente");
      } catch (error) {
        console.error('Error al actualizar foto de fondo:', error);
        setMensaje("Error al actualizar la foto de fondo");
      } finally {
        setCargando(false);
      }
    }
  }

  const handleFotoColeccionChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        setCargando(true);
        // Mostrar vista previa inmediata
        const reader = new FileReader();
        reader.onload = (e) => {
          const nuevaFoto = {
            id: Date.now(),
            src: e.target.result,
            alt: "Nueva imagen",
          };
          setColeccion([...coleccion, nuevaFoto]);
        };
        reader.readAsDataURL(file);
        
        // Subir al servidor
        const path = await subirImagen(file);
        const nuevaFoto = {
          id: Date.now(),
          src: path,
          alt: "Nueva imagen",
        };
        setColeccion([...coleccion, nuevaFoto]);
        setMensaje("Imagen agregada a la colección correctamente");
      } catch (error) {
        console.error('Error al agregar imagen a la colección:', error);
        setMensaje("Error al agregar la imagen a la colección");
      } finally {
        setCargando(false);
      }
    }
  }

  const eliminarFotoColeccion = (id) => {
    setColeccion(coleccion.filter((foto) => foto.id !== id))
  }

  const guardarCambios = async () => {
    try {
      setCargando(true);
      setMensaje("");
      
      // Obtener el ID del usuario de la sesión o localStorage
      const userId = localStorage.getItem('userId') || 2; // Usar 2 como fallback
      
      const profileData = {
        nombre,
        ubicacion,
        fecha,
        descripcion,
        gustos,
        fotoPerfil,
        fotoFondo,
        coleccion,
      };

      const response = await fetch(`/api/perfil/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      setEditandoPerfil(false);
      setEditandoFotoPerfil(false);
      setEditandoColeccion(false);
      setEditando(false);
      setMensaje("Perfil actualizado correctamente");
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      setMensaje("Error al guardar los cambios. Por favor, inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  // Mostrar mensaje de carga o error
  if (cargando) {
    return (
      <div className="Contenedor_Principal">
        <div className="Mensaje_Carga">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Contenedor_Principal">
      {/* Mensaje de estado */}
      {mensaje && (
        <div className="Mensaje_Estado">
          <p>{mensaje}</p>
          <button onClick={() => setMensaje("")}>Cerrar</button>
        </div>
      )}
      
      {/* Fondo */}
      <div className="Fondo">
        <Image
          src={fotoFondo || "/placeholder.svg"}
          alt="Fondo Perfil"
          fill
          priority
          quality={100}
          className="Img_Fondo"
        />
        {editando && (
          <button className="Btn_Editar_Foto Btn_Editar_Fondo" onClick={() => fotoFondoInputRef.current.click()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1" />
              <path d="M15 5l4 4" />
              <path d="M13.3 7.7L9 12l-1 4 4-1 4.3-4.3" />
            </svg>
            <span>Cambiar fondo</span>
          </button>
        )}
        <input
          type="file"
          ref={fotoFondoInputRef}
          onChange={handleFotoFondoChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      {/* Contenido Principal */}
      <div className="Contenedor_Contenido">
        {/* Columna Izquierda */}
        <div className="Columna_Izquierda">
          <div className="Tarjeta_Perfil">
            <div className="Info_Usuario">
              <div className="Foto_Container">
                <Image
                  src={fotoPerfil || "/placeholder.svg"}
                  alt="Foto de Perfil"
                  width={80}
                  height={80}
                  quality={100}
                  className="Foto_Perfil"
                />
                {editando && (
                  <button className="Btn_Editar_Foto" onClick={() => fotoPerfilInputRef.current.click()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1" />
                      <path d="M15 5l4 4" />
                      <path d="M13.3 7.7L9 12l-1 4 4-1 4.3-4.3" />
                    </svg>
                  </button>
                )}
                <input
                  type="file"
                  ref={fotoPerfilInputRef}
                  onChange={handleFotoPerfilChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>

              {editandoPerfil ? (
                <input type="text" value={nombre} onChange={handleNombreChange} className="Input_Nombre" />
              ) : (
                <h1 className="Nombre">
                  {nombre}
                  {editando && (
                    <button className="Btn_Editar_Texto" onClick={toggleEditarPerfil}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  )}
                </h1>
              )}

              {editandoPerfil ? (
                <input type="text" value={ubicacion} onChange={handleUbicacionChange} className="Input_Ubicacion" />
              ) : (
                <p className="Ubicacion">
                  {ubicacion}
                  {editando && (
                    <button className="Btn_Editar_Texto" onClick={toggleEditarPerfil}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  )}
                </p>
              )}

              {editandoPerfil ? (
                <input type="text" value={fecha} onChange={handleFechaChange} className="Input_Fecha" />
              ) : (
                <p className="Fecha">
                  {fecha}
                  {editando && (
                    <button className="Btn_Editar_Texto" onClick={toggleEditarPerfil}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  )}
                </p>
              )}

              <div className="Contador">
                <span className="Numero">16K</span>
                <svg
                  className="Icono_Corazon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>

            <div className="Descripcion">
              {editandoPerfil ? (
                <textarea value={descripcion} onChange={handleDescripcionChange} className="Input_Descripcion" />
              ) : (
                <p>
                  {descripcion}
                  {editando && (
                    <button className="Btn_Editar_Texto" onClick={toggleEditarPerfil}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  )}
                </p>
              )}

              <ul className="Lista_Gustos">
                {editandoPerfil ? (
                  <>
                    {(gustos || []).map((gusto, index) => (
                      <li key={index} className="Gusto_Editable">
                        <input
                          type="text"
                          value={gusto}
                          onChange={(e) => handleGustoChange(index, e.target.value)}
                          className="Input_Gusto"
                        />
                        <button className="Btn_Eliminar_Gusto" onClick={() => eliminarGusto(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                    <button className="Btn_Agregar_Gusto" onClick={agregarGusto}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      <span>Agregar gusto</span>
                    </button>
                  </>
                ) : (
                  <>
                    {(gustos || []).map((gusto, index) => (
                      <li key={index}>{gusto}</li>
                    ))}
                  </>
                )}
              </ul>

              {editandoPerfil && (
                <div className="Botones_Accion">
                  <button className="Btn_Guardar" onClick={guardarCambios}>
                    Guardar
                  </button>
                  <button className="Btn_Cancelar" onClick={toggleEditarPerfil}>
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="Seccion_Negocios">
              <h2>negocios</h2>
              <button className="Btn_Editar" onClick={toggleEditar}>
                <span>agregar / editar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="Columna_Derecha">
          <div className="Tarjeta_Coleccion">
            <div className="Cabecera_Coleccion">
              <h2 className="Titulo_Coleccion">Colección</h2>
              {editando && (
                <button className="Btn_Agregar_Foto" onClick={() => fotoColeccionInputRef.current.click()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Agregar foto</span>
                </button>
              )}
              <input
                type="file"
                ref={fotoColeccionInputRef}
                onChange={handleFotoColeccionChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

            <div className="Grid_Coleccion">
              {coleccion.map((foto) => (
                <div key={foto.id} className="Item_Coleccion">
                  <Image
                    src={foto.src || "/placeholder.svg"}
                    alt={foto.alt}
                    width={200}
                    height={150}
                    quality={90}
                    className="Img_Coleccion"
                  />
                  {editando && (
                    <button className="Btn_Eliminar_Foto" onClick={() => eliminarFotoColeccion(foto.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

