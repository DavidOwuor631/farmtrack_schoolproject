import { sequelize } from '../config/databaseConfig.js';
import { User } from './user.model'; // Import your User model

// Initialize models
export const initializeModels = async () => {
    try {
        await sequelize.authenticate(); // Test connection
        console.log('Database connection established successfully.');

        // Initialize the User model (add additional models here if needed)
        await User.sync({ alter: false }); // Sync model with the database (use { force: true } for resetting tables)
        console.log('Models synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
