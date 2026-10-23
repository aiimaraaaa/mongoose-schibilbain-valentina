import { Router } from "express";
import {
  createTechnology,
  deleteTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
} from "../controllers/technology.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createTechnologyValidation,
  updateTechnologyValidation,
} from "../middlewares/validations/technology.validation.js";

export const technologyRouter = Router();

technologyRouter.post("/technologies", createTechnologyValidation, validate, createTechnology);
technologyRouter.get("/technologies", getAllTechnologies);
technologyRouter.get("/technologies/:id", updateTechnologyValidation, validate, getTechnologyById);
technologyRouter.put("/technologies/:id", updateTechnologyValidation, validate, updateTechnology);
technologyRouter.delete("/technologies/:id", updateTechnologyValidation, validate, deleteTechnology);