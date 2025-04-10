/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dgoturismo2025.s3.us-west-1.amazonaws.com',
        // port: '', // Opcional
        // pathname: '/uploads/**', // Opcional: si todas tus imágenes están bajo /uploads/
      },
      // Puedes añadir aquí otros dominios si es necesario
    ],
  },
};

export default nextConfig;
