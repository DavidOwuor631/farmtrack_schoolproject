/*import { Router } from 'express';
import { Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

// Authentication routes
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

// Example route handler
router.post('/api/example', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Alternative example route handler
const handleExample = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    res.status(200).json({ message: 'Data received', data });
  } catch (err: unknown) {
    if (err instanceof Error) {
      // Now TypeScript knows `err` is an instance of `Error`
      res.status(500).json({ message: 'Server Error', error: err.message });
    } else {
      // Fallback for cases where `err` is not an instance of `Error`
      res.status(500).json({ message: 'Server Error', error: 'Unknown error occurred' });
    }
  }

router.post('/api/example-alternate', handleExample);
}
export default router;*/
import { Router } from 'express';
import { registerUser,loginUser } from '../controllers/auth.controller';

const router = Router();

// Endpoint to handle user registration
router.post('/signup', registerUser);
router.post('/login', loginUser);


export default router;

