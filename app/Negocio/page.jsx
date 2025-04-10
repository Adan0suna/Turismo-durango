"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import "./negocio.css";

export default function BusinessProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "Rafita",
    location: "Durango, Mexico",
    phone: "+52 681 111 111",
    likes: "16",
    backgroundImage: "/assets/Negocio/pan.png",
    profileImage: "/assets/Negocio/per.png",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState(profileData);
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    type: "Restaurante",
    subtype: "negocio tipo 2",
    url: "",
    openingHours: {
      hour: "20",
      minute: "00",
      period: "AM",
    },
    closingHours: {
      hour: "20",
      minute: "00",
      period: "PM",
    },
    image: null,
  });
  const [businessList, setBusinessList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Validación de autenticación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.log("No hay token en localStorage");
          router.push("/Login");
          return;
        }

        // Verificar que el token es válido
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.log("Token expirado");
          alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          localStorage.removeItem("token");
          router.push("/Login");
          return;
        }

        console.log("Token válido, usuario autenticado");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al verificar el token:", error);
        localStorage.removeItem("token");
        router.push("/Login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Si está cargando, mostrar un mensaje de carga
  if (isLoading) {
    return (
      <div className="loading-container">
      </div>
    );
  }

  // Si no está autenticado, no mostrar el contenido
  if (!isAuthenticated) {
    return null;
  }

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewBusiness({ ...newBusiness, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusiness((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setNewBusiness((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeChange = (type, field, value) => {
    setNewBusiness((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfileChanges = () => {
    setProfileData(editedProfileData);
    setIsEditingProfile(false);
  };

  const cancelProfileEdit = () => {
    setEditedProfileData(profileData);
    setIsEditingProfile(false);
  };

  const handleAddBusiness = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes estar autenticado para crear un negocio");
        return;
      }

      // Convertir los horarios a formato de 24 horas
      const formatTime = (hours, minutes, period) => {
        let hour = parseInt(hours);
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
        return `${hour.toString().padStart(2, "0")}:${minutes}`;
      };

      const horario_apertura = formatTime(
        newBusiness.openingHours.hour,
        newBusiness.openingHours.minute,
        newBusiness.openingHours.period
      );

      const horario_cierre = formatTime(
        newBusiness.closingHours.hour,
        newBusiness.closingHours.minute,
        newBusiness.closingHours.period
      );

      // Crear FormData para enviar la imagen y los datos
      const formData = new FormData();
      formData.append('nombre', newBusiness.name);
      formData.append('email', newBusiness.category);
      formData.append('ubicacion', newBusiness.location);
      formData.append('descripcion', newBusiness.description);
      formData.append('tipo', newBusiness.type);
      formData.append('url_negocio', newBusiness.url);
      formData.append('dia', selectedDays.join(","));
      formData.append('horario_apertura', horario_apertura);
      formData.append('horario_cierre', horario_cierre);

      // Agregar la imagen si existe
      if (newBusiness.image) {
        formData.append('imagen', newBusiness.image);
      }

      const response = await fetch("/api/negocio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Limpiar el formulario después de un registro exitoso
        setNewBusiness({
          name: "",
          category: "",
          location: "",
          description: "",
          type: "Restaurante",
          subtype: "negocio tipo 2",
          url: "",
          openingHours: {
            hour: "20",
            minute: "00",
            period: "AM",
          },
          closingHours: {
            hour: "20",
            minute: "00",
            period: "PM",
          },
          image: null,
        });
        setSelectedDays([]);
        setPreviewImage(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al registrar el negocio");
      }
    } catch (error) {
      console.error("Error al registrar el negocio:", error);
      alert("Ocurrió un error al registrar el negocio");
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="grid">
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-header">
                <div className="background-image">
                  <Image
                    src={profileData.backgroundImage || "/assets/Negocio/pan.png"}
                    alt="Background"
                    fill
                    className="cover-image"
                  />
                </div>
                <div className="profile-image-wrapper">
                  <div className="profile-image">
                    <Image
                      src={profileData.profileImage || "/placeholder.svg"}
                      alt={profileData.name}
                      width={128}
                      height={128}
                      className="avatar-image"
                    />
                  </div>
                </div>
              </div>

              <div className="profile-info">
                <div className="profile-details">
                  {isEditingProfile ? (
                    <div className="profile-edit-form">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          value={editedProfileData.name}
                          onChange={handleProfileInputChange}
                          placeholder="Nombre"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="location"
                          value={editedProfileData.location}
                          onChange={handleProfileInputChange}
                          placeholder="Ubicación"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="phone"
                          value={editedProfileData.phone}
                          onChange={handleProfileInputChange}
                          placeholder="Teléfono"
                          className="form-input"
                        />
                      </div>
                      <div className="profile-edit-actions">
                        <button onClick={saveProfileChanges} className="save-button">
                          Guardar
                        </button>
                        <button onClick={cancelProfileEdit} className="cancel-button">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="profile-name">{profileData.name}</h2>
                      <p className="profile-location">{profileData.location}</p>
                      <p className="profile-phone">{profileData.phone}</p>
                      <button onClick={() => setIsEditingProfile(true)} className="edit-profile-button">
                        Editar Perfil
                      </button>
                    </div>
                  )}
                  <div className="likes-counter">
                    <span className="likes-count">{profileData.likes}</span>
                    <svg
                      className="heart-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      stroke="red"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                </div>

                <div className="business-list">
                  <h3 className="business-list-title">Negocios</h3>
                  <ul className="business-items">
                    {businessList.map((item) => (
                      <li key={item.id} className="business-item">
                        <div className="business-item-content">
                          <span className="business-item-icon">A</span>
                          <span>{item.name}</span>
                        </div>
                        <button className="add-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="plus-icon"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="form-section">
            <div className="form-card">
              <h2 className="form-title">nuevo local</h2>

              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={newBusiness.name}
                      onChange={handleInputChange}
                      placeholder="nombre del establecimiento"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="category"
                      value={newBusiness.category}
                      onChange={handleInputChange}
                      placeholder="Email del negocio"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="location"
                      value={newBusiness.location}
                      onChange={handleInputChange}
                      placeholder="ubicación"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      name="description"
                      value={newBusiness.description}
                      onChange={handleInputChange}
                      placeholder="descripción"
                      className="form-textarea"
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tipo de establecimiento:</label>
                    <select name="type" value={newBusiness.type} onChange={handleSelectChange} className="form-select">
                      <option value="Restaurante">Restaurante</option>
                      <option value="Cafetería">Cafetería</option>
                      <option value="Tienda">Tienda</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Entretenimiento">Entretenimiento</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">URL del negocio:</label>
                    <div className="url-input-wrapper">
                      <input
                        type="text"
                        name="url"
                        value={newBusiness.url}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                        className="url-input"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="link-icon"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label className="form-label">Días inhábiles:</label>
                    <div className="weekday-selector">
                      {["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"].map((day, i) => (
                        <div key={i} className="weekday-checkbox-container">
                          <input
                            type="checkbox"
                            id={`day-${i}`}
                            checked={selectedDays.includes(day)}
                            onChange={() => handleDaySelect(day)}
                            className="weekday-checkbox"
                          />
                          <label htmlFor={`day-${i}`} className="weekday-label">
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="time-selectors">
                    <div className="form-group">
                      <label className="form-label">Horario de apertura:</label>
                      <div className="time-selector">
                        <div className="time-inputs">
                          <select
                            value={newBusiness.openingHours.hour}
                            onChange={(e) => handleTimeChange("openingHours", "hour", e.target.value)}
                            className="time-select"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                              <option key={hour} value={hour.toString().padStart(2, "0")}>
                                {hour.toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                          <span className="time-separator">:</span>
                          <select
                            value={newBusiness.openingHours.minute}
                            onChange={(e) => handleTimeChange("openingHours", "minute", e.target.value)}
                            className="time-select"
                          >
                            {["00", "15", "30", "45"].map((minute) => (
                              <option key={minute} value={minute}>
                                {minute}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="period-selector">
                          <button
                            type="button"
                            className={`period-button ${newBusiness.openingHours.period === "AM" ? "period-button-active" : ""}`}
                            onClick={() => handleTimeChange("openingHours", "period", "AM")}
                          >
                            AM
                          </button>
                          <button
                            type="button"
                            className={`period-button ${newBusiness.openingHours.period === "PM" ? "period-button-active" : ""}`}
                            onClick={() => handleTimeChange("openingHours", "period", "PM")}
                          >
                            PM
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Horario de cierre:</label>
                      <div className="time-selector">
                        <div className="time-inputs">
                          <select
                            value={newBusiness.closingHours.hour}
                            onChange={(e) => handleTimeChange("closingHours", "hour", e.target.value)}
                            className="time-select"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                              <option key={hour} value={hour.toString().padStart(2, "0")}>
                                {hour.toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                          <span className="time-separator">:</span>
                          <select
                            value={newBusiness.closingHours.minute}
                            onChange={(e) => handleTimeChange("closingHours", "minute", e.target.value)}
                            className="time-select"
                          >
                            {["00", "15", "30", "45"].map((minute) => (
                              <option key={minute} value={minute}>
                                {minute}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="period-selector">
                          <button
                            type="button"
                            className={`period-button ${newBusiness.closingHours.period === "AM" ? "period-button-active" : ""}`}
                            onClick={() => handleTimeChange("closingHours", "period", "AM")}
                          >
                            AM
                          </button>
                          <button
                            type="button"
                            className={`period-button ${newBusiness.closingHours.period === "PM" ? "period-button-active" : ""}`}
                            onClick={() => handleTimeChange("closingHours", "period", "PM")}
                          >
                            PM
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Agrega tu imagen:</label>
                    <div className="image-upload">
                      {previewImage ? (
                        <div className="preview-image-container">
                          <Image
                            src={previewImage || "/placeholder.svg"}
                            alt="Preview"
                            width={200}
                            height={200}
                            className="preview-image"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null)
                              setNewBusiness((prev) => ({ ...prev, image: null }))
                            }}
                            className="remove-image-button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="close-icon"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <div className="upload-icon-container">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="upload-icon"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </div>
                          <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input"
                          />
                          <label htmlFor="image-upload" className="upload-label">
                            Click to upload
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button onClick={handleAddBusiness} className="submit-button">
                  Add Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

