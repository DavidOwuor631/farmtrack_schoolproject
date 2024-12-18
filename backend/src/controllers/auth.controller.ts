/*import { Request, Response  } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    return res.status(200).json({ token });
  }

  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await AuthService.signup({ name, email, password });
    return res.status(201).json(user);
  }
}

export default new AuthController();*/
/*import { Request, Response } from 'express';
import  User  from '../models/user.model'; // Replace with your actual User model
import bcrypt from 'bcrypt'; // If using bcrypt for password hashing
import jwt from 'jsonwebtoken'; // If using JWT for authentication





class AuthController {
    //const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';
    //const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  // Signup method
  static async signup(req: Request, res: Response): Promise<void> {
    const { email, password, name } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ email, password: hashedPassword, name });

      // Send success response
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Login method
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '10h' });

      // Send response with token
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default AuthController;
*/
/*import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/databaseConfig'; // Adjust path as needed

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, role } = req.body;

    try {
        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.query(
            `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
            { replacements: [username, email, hashedPassword, role] }
        );

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user. Please try again.' });
    }
};*/
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/databaseConfig'; // Make sure this points to your Sequelize db config
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, role } = req.body;

    // Log the request body to check if all fields are present
    console.log(req.body);  // Debugging step

    if (!username || !email || !password || !role) {
        // If any required field is missing, return an error
         res.status(400).json({ message: 'Please provide all required fields: username, email, password, role.' });
         return;
    }

    try {
        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Debugging: Check if hashedPassword is being generated correctly
        console.log('Hashed password:', hashedPassword);  // Debugging step

        // Insert the new user into the database
        await db.query(
            `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
            { replacements: [username, email, hashedPassword, role] }
        );

        // Return a success response
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error registering user:', error);
        
        // Return a failure response
        res.status(500).json({ message: 'Error registering user. Please try again.' });
    }
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
      res.status(400).json({ message: 'Please provide both email and password.' });
      return;
  }

  try {
      // Check if the user exists
      const [userResult]: any = await db.query(
          `SELECT * FROM users WHERE email = ?`,
          { replacements: [email] }
      );

      if (!userResult || userResult.length === 0) {
          res.status(400).json({ message: 'Invalid email or password.' });
          return;
      }

      const user = userResult[0];

      // Compare the provided password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
          res.status(400).json({ message: 'Invalid email or password.' });
          return;
      }

      // Generate a JWT token
      const token = jwt.sign(
          { userId: user.id, role: user.role },
          JWT_SECRET,
          { expiresIn: '1h' }
      );

      // Send the token and user data in the response
      res.json({
          message: 'Login successful!',
          token,
          user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
          },
      });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Error during login. Please try again.' });
  }
};

