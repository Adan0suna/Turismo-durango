-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2025 a las 18:46:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usuarios_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `username`, `email`, `password`, `nombre`, `apellido`) VALUES
(1, 'juan123', 'juan@example.com', 'password', 'Juan', 'Pérez'),
(2, 'Kishirukito', 'ios27@gmail.com', 'password12', 'Irvin', 'Ortiz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_info`
--

CREATE TABLE `usuario_info` (
  `id_informacion` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `img_usuario` varchar(100) DEFAULT NULL,
  `ubicacion` varchar(150) DEFAULT NULL,
  `img_fondo` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `gustos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gustos`)),
  `img_coleccion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`img_coleccion`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_info`
--

INSERT INTO `usuario_info` (`id_informacion`, `usuario_id`, `img_usuario`, `ubicacion`, `img_fondo`, `descripcion`, `gustos`, `img_coleccion`) VALUES
(1, 1, 'user.jpg', 'Madrid, España', 'fon.png', 'Amante de la tecnología', '{\"gustos\": [\"música\", \"deportes\", \"cine\", \"lectura\"]}', '{\"imagenes\": [\"img1.jpg\", \"img2.jpg\", \"img3.jpg\", \"img4.jpg\"]}'),
(2, 2, 'FzpSDjmXwAEJYX3.jpeg', 'Te pizco el Ollo', '939141-Master-Yi-Blood-moon-Blood-Moon-league-of-legends.jpg', 'Valiendo Vrg', '{\"gustos\": [\"Videojuegos\", \"Maruchan\", \"cine\", \"lectura (mangas)\", \"MCR\", \"Papucho Kennedy\"]}', '{\"imagenes\": [\"Viego Poster 30x40.jpg\", \"IMG_20250124_131422.jpg\", \"IMG_20240402_214059.jpg\", \"GYGqrvEb0AAHC4M.jpeg\"]}');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuario_info`
--
ALTER TABLE `usuario_info`
  ADD PRIMARY KEY (`id_informacion`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario_info`
--
ALTER TABLE `usuario_info`
  MODIFY `id_informacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuario_info`
--
ALTER TABLE `usuario_info`
  ADD CONSTRAINT `usuario_info_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
