import { Request, Response } from 'express';
import { sequelize } from '../config/databaseConfig';
import { DataTypes, Model } from 'sequelize';

// Define User model
class User extends Model {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
}

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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false, // Disable createdAt and updatedAt fields
    }
);

// Sync model with the database
sequelize.sync();

export default class UserController {
    // Create a new user
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({ name, email, password });
            res.status(201).json({ message: 'User created successfully!', user });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

    // Get all users
    static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    }

    // Get a user by ID
    static async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    }

    // Update a user
    static async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;

            await user.save();

            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }

    // Delete a user
    static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}

