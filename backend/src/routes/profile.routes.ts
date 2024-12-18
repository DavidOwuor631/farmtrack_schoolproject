// user.routes.ts
import { Router } from 'express';
import { getAllProfiles, getProfileById, upsertProfile, deleteProfile } from '../controllers/profile.controller';

const router = Router();

// Get all profiles
router.get('/profiles', getAllProfiles);

// Get profile by userId
router.get('/profiles/:userId', getProfileById);

// Create or update profile
router.put('/profiles/:userId', upsertProfile);

// Delete profile
router.delete('/profiles/:userId', deleteProfile);

export default router;
