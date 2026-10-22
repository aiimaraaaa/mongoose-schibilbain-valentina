import { body, param } from "express-validator";

export const createProjectValidation = [
  body("code").trim().notEmpty().withMessage("El código es obligatorio"),
  body("name").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("description").trim().notEmpty().withMessage("La descripción es obligatoria"),
  body("status").optional().isIn(["planning", "in_progress", "paused", "finished"]).withMessage("Estado inválido"),
  body("start_date").notEmpty().withMessage("La fecha de inicio es obligatoria").isISO8601().withMessage("Fecha inválida"),
  body("budget").notEmpty().withMessage("El presupuesto es obligatorio").isNumeric().withMessage("Debe ser un número"),
  body("leader_id").notEmpty().withMessage("El líder es obligatorio").isMongoId().withMessage("ID de líder inválido"),
  body("technologies").optional().isArray().withMessage("Debe ser un array de IDs"),
];

export const updateProjectValidation = [
  param("id").isMongoId().withMessage("ID de proyecto inválido"),
  body("code").optional().trim().notEmpty().withMessage("El código no puede estar vacío"),
  body("name").optional().trim().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("description").optional().trim().notEmpty().withMessage("La descripción no puede estar vacía"),
  body("status").optional().isIn(["planning", "in_progress", "paused", "finished"]).withMessage("Estado inválido"),
  body("start_date").optional().isISO8601().withMessage("Fecha inválida"),
  body("budget").optional().isNumeric().withMessage("Debe ser un número"),
  body("leader_id").optional().isMongoId().withMessage("ID de líder inválido"),
  body("technologies").optional().isArray().withMessage("Debe ser un array de IDs"),
];


export const linkTechnologyValidation = [
  param("projectId").isMongoId().withMessage("ID de proyecto inválido"),
  param("technologyId").isMongoId().withMessage("ID de tecnología inválido"),
];