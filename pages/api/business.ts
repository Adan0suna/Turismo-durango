import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

type BusinessData = {
  id: number;
  nombre: string;
  email: string;
  ubicacion: string;
  descripcion: string;
  tipo: string;
  url_negocio: string;
  dia: string;
  horario_apertura: string;
  horario_cierre: string;
  permisos: string | null;
  imagenes: string | null;
  redes: {
    google?: string;
    facebook?: string;
    instagram?: string;
  };
  horario: {
    apertura: string;
    cierre: string;
  };
  direccion: string;
  telefono: string;
  correo: string;
  calificacion: number;
  comentarios: Array<{
    img_ruta: string;
    img_user: string;
    user: string;
    calificacion: number;
    comentario: string;
  }>;
};

type Data = BusinessData | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { negocio_id } = req.query;

  if (!negocio_id) {
    return res.status(400).json({ message: 'Missing negocio_id parameter' });
  }

  try {
    const query = `SELECT negocio_id, nombre, email, telefono, ubicacion, horario_apertura, horario_cierre, imagenes, promedio_estrellas 
                   FROM vista_negocios_con_rating WHERE negocio_id = ?`;
    const [rows]: [any[], any] = await pool.execute(query, [negocio_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const business = rows[0];

    // Construir datos adicionales
    const businessData: BusinessData = {
      id: business.id,
      nombre: business.nombre,
      email: business.email,
      ubicacion: business.ubicacion,
      descripcion: business.descripcion,
      tipo: business.tipo,
      url_negocio: business.url_negocio,
      dia: business.dia,
      horario_apertura: business.horario_apertura,
      horario_cierre: business.horario_cierre,
      permisos: business.permisos,
      imagenes: business.imagenes ? business.imagenes.split(',') : [], // Asegurarse de que las imágenes estén disponibles como un array
      redes: {
        google: business.url_google || null,
        facebook: business.url_facebook || null,
        instagram: business.url_instagram || null,
      },
      horario: {
        apertura: business.horario_apertura,
        cierre: business.horario_cierre,
      },
      direccion: business.ubicacion,
      telefono: business.telefono || '',
      correo: business.email,
      calificacion: business.calificacion || 0,
      comentarios: [
        // Aquí puedes agregar lógica para obtener comentarios relacionados
        // Ejemplo de datos estáticos:
        {
          img_ruta: '/path/to/image1.jpg',
          img_user: '/path/to/user1.jpg',
          user: 'Usuario 1',
          calificacion: 5,
          comentario: 'Excelente lugar!',
        },
      ],
    };

    res.status(200).json(businessData);
  } catch (error) {
    console.error('Error fetching business data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}