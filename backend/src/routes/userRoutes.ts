/*import { Router } from 'express';
import { getUsers } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
const id: number = 1; // Ensure this ID is correct

fetch(`/api/resource/${id}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
export default router;
*/
/*import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Assuming you have an interface or type for User
export interface UserAttributes {
  id: number;
  name: string;
  email: string; // Example field
}

// If some attributes are optional during creation
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Sequelize Model Definition
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number; // Non-null assertion since Sequelize ensures this
  public name!: string;
  public email!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Sequelize Instance (can be imported from another config file)
const sequelize = new Sequelize('farmtrack', 'farmtrack_user', 'Glass-z13', {
  host: 'localhost',
  dialect: 'mysql',
});

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User',
    tableName: 'users', // Optional: explicitly specify the table name
    timestamps: true, // Enable createdAt and updatedAt fields
  }
);

// Export the model for use in other parts of the backend
export default User;
*/
// user.routes.ts

import { Router } from 'express';
import { 
  getAllProfiles, 
  getProfileById, 
  upsertProfile, 
  deleteProfile 
} from '../controllers/profile.controller'; // import controller functions

const router = Router();

router.get('/profiles', getAllProfiles);  // Get all profiles
router.get('/profiles/:userId', getProfileById);  // Get profile by ID
router.put('/profiles/', upsertProfile);  // Create or update profile
router.delete('/profiles/', deleteProfile);  // Delete profile

export default router;
