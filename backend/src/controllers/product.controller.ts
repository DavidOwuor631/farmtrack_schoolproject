// src/controllers/product.controller.ts
/*import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import db from '../config/databaseConfig'; // Import your database configuration

// Function to add a product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, location, type, units } = req.body;
    const image = req.file?.filename; // Image filename from multer

    if (!name || !price || !image) {
       res.status(400).json({ message: 'Name, price, and image are required fields.' });
       return;
    }

    // Insert product into the database
    const query = `
      INSERT INTO products (id, name, description, price, location, type, units, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const id = uuidv4(); // Generate a unique ID for the product
    const values = [id, name, description, price, location, type, units, image];

    await db.query(query, values);

    res.status(201).json({ message: 'Product added successfully', productId: id });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Function to handle getting all products (optional for further extension)
export const getProducts = async (_reqExpress: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM products';
    const [products] = await db.query(query);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};*/
import { Request, Response } from 'express';
import db from '../config/databaseConfig';  // Adjust the path as needed
import { QueryTypes } from 'sequelize';

// Controller to add a product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
    // Destructure the form fields from req.body
    const { name, description, price, units, location } = req.body;
    
    // Multer adds the uploaded file to req.file
    const image = req.file?.filename; // Safely access the file using `req.file`

    const query = `
        INSERT INTO products (name, description, price, units, location, image)
        VALUES (:name, :description, :price, :units, :location, :image)
    `;

    try {
        // Use sequelize to run the query
        await db.query(query, {
            replacements: { name, description, price, units, location, image },
            type: QueryTypes.INSERT,  // This specifies the type of query (INSERT in this case)
        });

        // Respond with a success message
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product.' });
    }
};

// Controller to get all products
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    const query = `
        SELECT * FROM products
    `;

    try {
        // Query the database for all products
        const [results] = await db.query(query, { type: QueryTypes.SELECT });

        // Respond with the product data
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products.' });
    }
};
