import { Request, Response } from 'express';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isExpanded: boolean;
}

// Mock database for demonstration
const faqs: FAQ[] = [];

// Get all FAQs
export const getAllFAQs = (req: Request, res: Response) => {
  res.status(200).json(faqs);
};

// Create a new FAQ
export const createFAQ = (req: Request, res: Response) => {
  const newFAQ: FAQ = req.body;
  faqs.push(newFAQ);
  res.status(201).json({ message: 'FAQ created', faq: newFAQ });
};

// Update an FAQ
export const updateFAQ = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = faqs.findIndex((faq) => faq.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'FAQ not found' });
  }
  faqs[index] = { ...faqs[index], ...req.body };
  res.status(200).json({ message: 'FAQ updated', faq: faqs[index] });
};

// Delete an FAQ
export const deleteFAQ = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = faqs.findIndex((faq) => faq.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'FAQ not found' });
  }
  faqs.splice(index, 1);
  res.status(200).json({ message: 'FAQ deleted' });
};
