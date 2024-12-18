import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../database'; // Sequelize instance

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Assuming the user's ID is available in the JWT payload
    const farmerId = req.user?.userId;

    if (!farmerId) {
      res.status(401).json({ message: 'Unauthorized: Farmer ID not found' });
      return;
    }

    // SQL query with Sequelize
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM crops WHERE farmer_id = :farmerId) AS crops, 
        (SELECT SUM(income) FROM farm_income WHERE farmer_id = :farmerId) AS income,
        (SELECT SUM(expenses) FROM farm_expenses WHERE farmer_id = :farmerId) AS expenses,
        (SELECT weather FROM weather_reports WHERE location = :location) AS weather,
        (SELECT last_harvest_date FROM harvests WHERE farmer_id = :farmerId) AS lastHarvest
    `;

    // Execute the query using Sequelize
    const results = await db.query(query, {
      replacements: { farmerId, location: 'LocationName' },
      type: QueryTypes.SELECT,
    });

    // Ensure results are in the expected format
    const data = results[0] as {
      crops: number;
      income: number;
      expenses: number;
      weather: string;
      lastHarvest: string;
    };

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error });
  }
};
