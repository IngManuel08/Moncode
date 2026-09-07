import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProductWithoutImage,
    updateProductWithImage,
    getAllProducts,
    searchProducts,
    createProductReview
} from '../controllers/product.controller.js'

//Importamos el validationSchema
import { validateSchema } from '../middlewares/validateSchema.js';

//Importamos el esquema de validacion de productos
import { productSchema, productUpdateSchema } from '../schemas/product.schemas.js'

//Importamos el middleware para subir imagenes a cloudinary
import { uploadToCloudinary } from '../middlewares/uploadImage.js';

const router = Router();

router.get('/getallproducts', getAllProducts);

//Ruta para obtener todos los productos
router.get('/products', authRequired, getProducts);

//Ruta para crear un producto
router.post('/products', authRequired, uploadToCloudinary, validateSchema(productSchema), createProduct);

//Ruta para obtener un producto por Id
router.get('/products/:id', authRequired, getProductById);

//Ruta para eliminar un producto
router.delete('/products/:id', authRequired, deleteProduct);

//Ruta para actualizar un producto sin actualizar la imagen
router.put('/products/:id', authRequired, validateSchema(productUpdateSchema), updateProductWithoutImage);

//Ruta para actualizar un producto y CAMBIAR la imagen
router.put('/products/updatewithimage/:id', authRequired, uploadToCloudinary, validateSchema(productSchema), updateProductWithImage);
//Ruta para actualizar un producto y SIN cambiar la imagen
router.put('/products/updatewithoutimage/:id', authRequired, uploadToCloudinary, validateSchema(productSchema), updateProductWithoutImage);

router.get('/search', searchProducts);

router.post('/products/:id/reviews', authRequired, createProductReview);

export default router;
