/*import express from 'express';
import { getFarmerData, updateFarmerData } from '../controllers/farmers-dashboard.contoller';

const router = express.Router();

// Get data for the farmer dashboard
router.get('/:farmerId', getFarmerData);

// Update farmer-specific data
router.put('/:farmerId', updateFarmerData);

export default router;*/
// src/routes/farmer-dashboard.route.ts
import express from 'express';
import { getDashboardData } from '../controllers/farmers-dashboard.contoller';
import { authenticate } from '../middlewares/auth.middleware'; // Import the authentication middleware

const router = express.Router();

// Define the route for fetching dashboard data
// Apply the authenticate middleware to protect this route
router.get('/farmer-dashboard', authenticate, getDashboardData);

export default router;
