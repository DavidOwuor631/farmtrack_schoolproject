import express from 'express';
import { getAllArticles, getArticleById, createArticle } from '../controllers/articles.controller';
import { Request, Response } from 'express';

const router = express.Router();

// Get all articles
router.get('/', getAllArticles);

// Get a single article by ID
router.get('/:id', getArticleById);

// Create a new article
router.post('/', createArticle);

export default router;
