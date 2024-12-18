/*import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import token from '../controllers/auth.controller'
// Define a structure for your JWT payload (this can vary based on your JWT structure)
interface UserPayload extends JwtPayload {
  userId: string;
  userName: string;
  roleName: string;
}

interface AuthRequest extends Request {
  user?: UserPayload; // Type the `user` field with the decoded JWT payload
}

const SECRET_KEY = process.env.SECRET_KEY as string; // Ensure SECRET_KEY is required

/**
 * Middleware to authenticate user requests using a JSON Web Token (JWT).
 * Validates the token and adds the decoded user data to the request object.
 */
/*export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: 'Access Denied: No Token Provided' });
    return;
  }

  try {
    // Decode the token and assign it to the user object
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    req.user = decoded; // Attach decoded user data to the request
    next(); // Call the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
*/
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the payload structure for your JWT
interface UserPayload {
  userId: string; // Adjust to match your JWT payload
}

// Extend the Request object to include `user`
interface AuthRequest extends Request {
  user?: UserPayload;
}

const SECRET_KEY = process.env.SECRET_KEY || 'your-default-secret-key';

// Middleware to authenticate requests
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access Denied: No Token Provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    req.user = decoded; // Attach the decoded payload to the `user` property
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
