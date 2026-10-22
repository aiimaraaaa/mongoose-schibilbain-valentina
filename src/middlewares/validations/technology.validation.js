import { body, param } from "express-validator";

export const createTechnologyValidation = [
  body("name").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("description").optional().isString().withMessage("La descripción debe ser texto"),
];

export const updateTechnologyValidation = [
  param("id").isMongoId().withMessage("ID de tecnología inválido"),
  body("name").optional().trim().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("description").optional().isString().withMessage("La descripción debe ser texto"),
];