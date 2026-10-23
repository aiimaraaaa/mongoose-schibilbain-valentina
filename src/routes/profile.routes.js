import { Router } from "express";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profile.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createProfileValidation,
  updateProfileValidation,
} from "../middlewares/validations/profile.validation.js";

export const profileRouter = Router();

profileRouter.post("/profiles", createProfileValidation, validate, createProfile);
profileRouter.get("/profiles", getAllProfiles);
profileRouter.get("/profiles/:id", updateProfileValidation, validate, getProfileById); 
profileRouter.put("/profiles/:id", updateProfileValidation, validate, updateProfile);
profileRouter.delete("/profiles/:id", updateProfileValidation, validate, deleteProfile);