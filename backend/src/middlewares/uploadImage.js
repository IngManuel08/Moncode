import multer from 'multer';
import cloudinary from 'cloudinary';

// Configuración Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}).single('image');

export const uploadToCloudinary = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {

            // Error por tamaño o multer
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ message: ['Tamaño del archivo excedido'] });
                }
                return res.status(400).json({ message: ['Error al cargar la imagen'] });
            }


            if (!req.file) {
                return next();
            }

            const allowedMimes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif',
                'image/webp'
            ];

            // Validar formato
            if (!allowedMimes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: ['Formato de imagen no permitido'] });
            }

            // Convertir a Base64
            const base64Image = Buffer.from(req.file.buffer).toString('base64');
            const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

            // Subir a Cloudinary
            const uploadResponse = await cloudinary.v2.uploader.upload(dataUri);

            // Guardar la URL
            req.urlImage = uploadResponse.url;

            console.log("Imagen cargada:", req.file.originalname);
            next();
        });

    } catch (error) {
        return res.status(400).json({ message: [error.message] });
    }
};
