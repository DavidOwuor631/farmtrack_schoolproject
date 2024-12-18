import { Request, Response } from 'express';

interface Article {
  id: number;
  title: string;
  summary: string;
  documentUrl: string;
}

// Mock database for demonstration
const articles: Article[] = [];

// Get all articles
export const getAllArticles = (req: Request, res: Response) => {
  res.status(200).json(articles);
};

// Get a single article by ID
export const getArticleById = (req: Request, res: Response): void => {
    const articleId = req.params.id;

    if (!articleId) {
        res.status(404).json({ message: 'Article not found' });
        return; // Exit without returning the Response object
    }

    res.status(200).json({ message: 'Article found', articleId });
};

// Create a new article
export const createArticle = (req: Request, res: Response) => {
  const newArticle: Article = req.body;
  articles.push(newArticle);
  res.status(201).json({ message: 'Article created', article: newArticle });
};

// Update an existing article
export const updateArticle = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = articles.findIndex((a) => a.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Article not found' });
  }
  articles[index] = { ...articles[index], ...req.body };
  res.status(200).json({ message: 'Article updated', article: articles[index] });
};

// Delete an article
export const deleteArticle = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = articles.findIndex((a) => a.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Article not found' });
  }
  articles.splice(index, 1);
  res.status(200).json({ message: 'Article deleted' });
};
