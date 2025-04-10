import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

type CommentWithUserData = {
  estrellas: number;
  comentario: string;
  nombre_usuario: string;
  imagen_usuario: string | null;
  fecha: string;
};

type Data = CommentWithUserData[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const query = 'SELECT estrellas, comentario, nombre_usuario, imagen_usuario, fecha FROM vista_comentarios_con_usuarios ORDER BY fecha DESC';
    const [rows] = await pool.execute(query);

    const comments: CommentWithUserData[] = rows as CommentWithUserData[];

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments with users:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}