"use client";

import { useState, useEffect } from "react";
import "./Carrusel_N.css";

const Carrusel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para cambiar de imagen
  const moveSlide = (step) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + step + images.length) % images.length
    );
  };

  // Cambia la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => moveSlide(1), 3000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>
        ❮
      </button>
      <button className="next" onClick={() => moveSlide(1)}>
        ❯
      </button>
    </div>
  );
};

export default Carrusel;
