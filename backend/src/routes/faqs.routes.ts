import express from 'express';
import { getAllFAQs, createFAQ } from '../controllers/faqs.controllers';

const router = express.Router();

// Get all FAQs
router.get('/', getAllFAQs);

// Create a new FAQ
router.post('/', createFAQ);

export default router;
