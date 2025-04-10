import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import bcrypt from 'bcryptjs';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validar que la contraseña tenga al menos 8 caracteres
  if (password.length < 8) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
  }

  try {
    // Verificar si el email ya existe
    const checkEmailQuery = 'SELECT id FROM users WHERE email = ?';
    const [existingUsers]: any = await pool.execute(checkEmailQuery, [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO users (name, email, password, rol) VALUES (?, ?, ?, ?)';
    const values = [name, email, hashedPassword, 1];
    await pool.execute(query, values);

    res.status(201).json({ message: 'Usuario Registrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}