// types/express.d.ts
import 'express';
import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string }; // Customize based on your JWT payload structure
    }
  }
}
declare global {
    namespace Express {
      interface Request {
        file?: Multer.File;  // Add the `file` property which Multer provides
      }
    }
  }