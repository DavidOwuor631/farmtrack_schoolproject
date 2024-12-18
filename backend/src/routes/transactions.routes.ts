import express from 'express';
import { createTransaction, getUserTransactions } from '../controllers/transactions.controller';

const router = express.Router();

router.post('/', createTransaction); // Create a new transaction
router.get('/user/:userId', getUserTransactions); // Get all transactions for a user

export default router;
