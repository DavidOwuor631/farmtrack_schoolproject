import { Request, Response } from 'express';

interface Profile {
  userId: string;
  userImg: string;
  userName: string;
  userEmail: string;
  bio: string; // Additional field for profile information
}

// Mock database
const profiles: Profile[] = [];

// Get all profiles
export const getAllProfiles = (req: Request, res: Response) => {
  res.status(200).json(profiles);
};

// Get profile by userId
export const getProfileById = (req: Request, res: Response) => {
  const { userId } = req.params;
  const profile = profiles.find((p) => p.userId === userId);
  if (!profile) {
     res.status(404).json({ message: 'Profile not found' });
     return;
  }
  res.status(200).json(profile);
};

// Create or update profile
export const upsertProfile = (req: Request, res: Response) => {
  const { userId } = req.params;
  const existingIndex = profiles.findIndex((p) => p.userId === userId);
  
  if (existingIndex !== -1) {
    profiles[existingIndex] = { ...profiles[existingIndex], ...req.body };
    res.status(200).json({ message: 'Profile updated', profile: profiles[existingIndex] });
    return;
  }
  
  const newProfile: Profile = { userId, ...req.body };
  profiles.push(newProfile);
  res.status(201).json({ message: 'Profile created', profile: newProfile });
};

// Delete profile
export const deleteProfile = (req: Request, res: Response) => {
  const { userId } = req.params;
  const index = profiles.findIndex((p) => p.userId === userId);
  if (index === -1) {
    res.status(404).json({ message: 'Profile not found' });
    return;
  }
  profiles.splice(index, 1);
  res.status(200).json({ message: 'Profile deleted' });
};
// profile.controller.ts

