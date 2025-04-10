import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../lib/config';
import { upload } from '../../lib/s3';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verificar el token JWT
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decodificar el token para obtener el user_id
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user_id = decoded.id;

    // Procesar la subida de archivos
    await new Promise((resolve, reject) => {
      upload.single('imagen')(req as any, res as any, (err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });

    const {
      nombre,
      email,
      ubicacion,
      descripcion,
      tipo,
      url_negocio,
      dia,
      horario_apertura,
      horario_cierre,
    } = req.body;

    // Validar campos requeridos
    if (!nombre || !email || !tipo || !dia || !horario_apertura || !horario_cierre) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Obtener la URL de la imagen si se subió una
    const imagen_url = (req as any).file?.location || null;

    // Insertar en la base de datos
    const query = `
      INSERT INTO negocios 
      (nombre, email, ubicacion, descripcion, tipo, url_negocio, dia, horario_apertura, horario_cierre, user_id, permisos) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      nombre,
      email,
      ubicacion || null,
      descripcion || null,
      tipo,
      url_negocio || null,
      dia,
      horario_apertura,
      horario_cierre,
      user_id,
      imagen_url
    ];

    await pool.execute(query, values);

    res.status(201).json({ message: 'Establecimiento registrado exitosamente' });
  } catch (error: any) {
    console.error('Error al registrar el establecimiento:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({ 
        message: 'Error en la base de datos: La tabla establecimientos no existe. Por favor, contacta al administrador.' 
      });
    }

    if (error.storageErrors && error.storageErrors.length > 0) {
      return res.status(500).json({ 
        message: 'Error al subir la imagen: ' + error.storageErrors[0].message 
      });
    }

    res.status(500).json({ 
      message: 'Error interno del servidor: ' + (error.message || 'Error desconocido') 
    });
  }
}