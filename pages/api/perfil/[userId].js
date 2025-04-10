import db from '../../../lib/db';

// Handler para GET y PUT
export default async function handler(req, res) {
  const { userId } = req.query; // Obtener userId de la URL dinámica

  if (req.method === 'GET') {
    try {
      const [userRows] = await db.query(
        'SELECT name FROM users WHERE id = ?',
        [userId]
      );

      const [infoRows] = await db.query(
        'SELECT * FROM usuario_info WHERE id = ?',
        [userId]
      );

      if (!userRows.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Función para parsear JSON de forma segura
      const safeParse = (str, fallback) => {
        try {
          return str ? JSON.parse(str) : fallback;
        } catch (e) {
          console.error('Error parsing JSON:', e.message, 'Input:', str);
          return fallback;
        }
      };

      const userData = {
        nombre: userRows[0].nombre,
        username: userRows[0].username,
        ubicacion: infoRows[0]?.ubicacion || '',
        descripcion: infoRows[0]?.descripcion || '',
        gustos: safeParse(infoRows[0]?.gustos, { gustos: [] }).gustos,
        fotoPerfil: infoRows[0]?.img_usuario ? `/assets/Perfil/${infoRows[0].img_usuario}` : '/assets/Perfil/user.jpg',
        fotoFondo: infoRows[0]?.img_fondo ? `/assets/Perfil/${infoRows[0].img_fondo}` : '/assets/Perfil/fon.png',
        coleccion: safeParse(infoRows[0]?.img_coleccion, { imagenes: [] }).imagenes.map((img, index) => ({
          id: index + 1,
          src: `/assets/Perfil/Coleccion/${img}`,
          alt: `Imagen ${index + 1}`,
        })),
      };

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el perfil' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        nombre,
        ubicacion,
        descripcion,
        gustos,
        fotoPerfil,
        fotoFondo,
        coleccion,
      } = req.body;

      // Actualizar tabla usuarios
      await db.query('UPDATE usuarios SET nombre = ? WHERE id_user = ?', [
        nombre,
        userId,
      ]);

      // Actualizar o insertar en usuario_info
      const [existingInfo] = await db.query(
        'SELECT id FROM usuario_info WHERE usuario_id = ?',
        [userId]
      );

      const infoData = {
        ubicacion,
        descripcion,
        gustos: JSON.stringify({ gustos }),
        img_usuario: fotoPerfil?.split('/').pop(),
        img_fondo: fotoFondo?.split('/').pop(),
        img_coleccion: JSON.stringify({
          imagenes: coleccion.map((item) => item.src.split('/').pop()),
        }),
      };

      if (existingInfo.length) {
        await db.query('UPDATE usuario_info SET ? WHERE usuario_id = ?', [
          infoData,
          userId,
        ]);
      } else {
        await db.query(
          'INSERT INTO usuario_info (usuario_id, ?) VALUES (?, ?)',
          [userId, infoData]
        );
      }

      res.status(200).json({ message: 'Perfil actualizado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}