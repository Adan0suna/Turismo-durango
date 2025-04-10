import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

type RestaurantData = {
  negocio_id: number;
  nombre_negocio: string;
  imagen_negocio: string | null;
  promedio_estrellas: number;
};

type Data = RestaurantData[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const query = 'SELECT negocio_id, nombre_negocio, imagen_negocio, promedio_estrellas FROM vista_promedio_reviews_restaurantes ORDER BY promedio_estrellas DESC LIMIT 3'; 
    const [rows] = await pool.execute(query);

    const restaurants: RestaurantData[] = rows as RestaurantData[];

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching top restaurants:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 