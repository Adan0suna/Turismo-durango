import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

type Comment = {
  estrellas: number;
  comentario: string;
  nombre_usuario: string;
  imagen_usuario: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const query = `
      SELECT estrellas, comentario, nombre_usuario, imagen_usuario
      FROM vista_comentarios_con_usuarios
      ORDER BY fecha DESC
    `;
    const [rows] = await pool.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}