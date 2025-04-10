import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

type Data = {
  message?: string;
  negocios?: Array<{
    id: number;
    nombre: string;
    email: string;
    ubicacion: string | null;
    descripcion: string | null;
    tipo: string;
    url_negocio: string | null;
    dia: string;
    horario_apertura: string;
    horario_cierre: string;
  }>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const query = 'SELECT * FROM negocios'; 
    const [rows]: any = await pool.query(query);

    res.status(200).json({ negocios: rows });
  } catch (error) {
    console.error('Error al obtener los negocios:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}