import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Desactivar el parser de body predeterminado de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Crear directorio si no existe
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'Perfil');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Configurar formidable
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    // Procesar la subida
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    console.log('Archivos recibidos:', files);

    // Verificar si hay archivos
    if (!files.file || !files.file[0]) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }

    const file = files.file[0];
    const fileExt = path.extname(file.originalFilename);
    const fileName = `${uuidv4()}${fileExt}`;
    const newPath = path.join(uploadDir, fileName);

    // Renombrar el archivo
    fs.renameSync(file.filepath, newPath);

    console.log('Archivo guardado en:', newPath);

    // Devolver la ruta relativa para guardar en la base de datos
    const relativePath = `/assets/Perfil/${fileName}`;
    res.status(200).json({ path: relativePath });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
} 