"use client";

import { useState } from "react";
import "./Calificar.css";

export default function Calificar({ rating, setRating }) {
  const handleRating = (index) => {
    setRating(index === rating ? index - 1 : index);
  };

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`estrellita ${i <= rating ? "llena" : "vacia"}`}
          onClick={() => handleRating(i)}
        >
          {i <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
