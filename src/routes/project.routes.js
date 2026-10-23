import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  linkTechnology,
  updateProject,
} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createProjectValidation,
  updateProjectValidation,
  linkTechnologyValidation,
} from "../middlewares/validations/project.validation.js";

export const projectRouter = Router();

projectRouter.post("/projects", createProjectValidation, validate, createProject);
projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", updateProjectValidation, validate, getProjectById);
projectRouter.put("/projects/:id", updateProjectValidation, validate, updateProject);
projectRouter.delete("/projects/:id", updateProjectValidation, validate, deleteProject);


projectRouter.post(
  "/projects/:projectId/technologies/:technologyId",
  linkTechnologyValidation,
  validate,
  linkTechnology
);