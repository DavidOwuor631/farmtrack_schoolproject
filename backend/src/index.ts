

/*import express, { Application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(express.json());


// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/


/*import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(express.json());

// Static Files (Serving Angular)
app.use(express.static(path.join(__dirname, '../../Agrismart-main/dist/Agriconnect')));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/Agriconnect/browser/index.html'));
});

// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/
/*import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mysql from 'mysql2/promise';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.APP_PORT || 3000;

const connectToDatabase = async (): Promise<mysql.Connection | void> => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'your-db',
    });
    console.log('Connected to MySQL database');
    return connection;
  } catch (err) {
    console.error('Could not connect to MySQL database', err);
  }
};

// Middleware
app.use(express.json());


app.use(express.static(path.join(__dirname, '../dist/Agriconnect')));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/Agriconnect/browser/index.html'));
});



// Sample route
app.get('/api/test', async (req: Request, res: Response) => {
  const connection = await connectToDatabase();
  if (connection) {
    const [rows] = await connection.query('SELECT 1 AS value');
    res.json(rows);
    await connection.end(); // Close the connection after use
  } else {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
});*/

/*import express, { Application, Request, Response } from 'express'; // Import types from Express
import cors from 'cors';

// Create an instance of the Express application
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define a type for the data
interface Data {
  name: string;
}

// Initial data
const data: Data[] = [{ name: 'John Doe' }, { name: 'Jane Smith' }];

// GET route to fetch data
app.get('/api/data', (req: Request, res: Response): void => {
  res.json(data); // Send the data array as a JSON response
});

// POST route to add data
app.post('/api/submit', (req: Request, res: Response): void => {
  const newData: Data = req.body; // Ensure the request body matches the Data interface
  data.push(newData); // Add the new data to the array
  res.json({ message: 'Data submitted successfully', newData }); // Respond with success
});

// Start the server
const PORT = 3000;
app.listen(PORT, (): void => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
*/
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes'; // Import the auth.routes file
import userRoutes from './routes/userRoutes'; 
import faqsRoutes from './routes/faqs.routes';
import transactionsRoutes from './routes/transactions.routes';
import farmer_dashboard from './routes/farmer_dashboard.routes';
import productRoutes from './routes/product.route'
import profileRoutes from './routes/profile.routes'; 
import { initializeModels } from './models';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());
initializeModels();
// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
 
// Register Routes
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with /api/auth
app.use('/api', userRoutes);
app.use('/api/', profileRoutes);
app.use('/api/products', productRoutes);
app.use('/api', faqsRoutes);
app.use('/api/transactionid', transactionsRoutes);
app.use('/api', farmer_dashboard);


// Test route to verify the server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
