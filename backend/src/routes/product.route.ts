/*import express from 'express';
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get a specific product by ID
router.get('/:productId', getProductById);

// Create a new product
router.post('/', createProduct);

// Update an existing product
router.put('/:productId', updateProduct);

// Delete a product
router.delete('/:productId', deleteProduct);

export default router;*/
// src/routes/product.route.ts

// src/routes/product.route.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct, getProducts } from '../controllers/product.controller';

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (_req: Express.Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '../../uploads')); // Save files in the `uploads` directory
  },
  filename: (_req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route to add a product (with image upload)
router.post('/products', upload.single('image'), addProduct);

// Route to get all products
router.get('/products', getProducts);

export default router;

