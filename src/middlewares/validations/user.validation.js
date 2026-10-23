import { body, param } from "express-validator";

export const createUserValidation = [
  body("username").trim().notEmpty().withMessage("El username es obligatorio"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const updateUserValidation = [
  param("id").isMongoId().withMessage("ID inválido"),
  body("username").optional().trim().notEmpty().withMessage("El username no puede estar vacío"),
  body("email").optional().isEmail().withMessage("Email inválido"),
  body("password").optional().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const idParamValidation = [
  param("id").isMongoId().withMessage("ID inválido"),
];