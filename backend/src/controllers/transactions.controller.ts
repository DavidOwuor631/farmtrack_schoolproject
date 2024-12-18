import { Request, Response } from 'express';
import Transaction from '../models/Transactions';
import User from '../models/user.model';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  const { customerId, productId, quantity, totalAmount, paymentMethod } = req.body;

  try {
    const transaction = await Transaction.create({
      customerId,
      productId,
      quantity,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
};

export const getUserTransactions = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.findAll({
      where: { customerId: userId },
      include: [{ model: User, as: 'customer' }],
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ message: 'Error retrieving transactions' });
  }
};
