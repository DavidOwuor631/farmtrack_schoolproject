import { Router, Request, Response } from 'express';

const router = Router();

// Mock Data
const mockData = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];

// GET Endpoint
router.get('/data', (req: Request, res: Response) => {
  res.json(mockData);
});

// POST Endpoint
router.post('/submit', (req: Request, res: Response) => {
  const { name } = req.body;
  if (name) {
    res.status(201).json({ message: 'Data submitted successfully', name });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

export default router;
