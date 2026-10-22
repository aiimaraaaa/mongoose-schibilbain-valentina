import { body, param } from "express-validator";

export const createProfileValidation = [
  body("employee_number").trim().notEmpty().withMessage("El número de empleado es obligatorio"),
  body("first_name").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("last_name").trim().notEmpty().withMessage("El apellido es obligatorio"),
  body("phone").optional().isString(),

  body("preferences.language").optional().isIn(["es", "en"]).withMessage("Idioma inválido"),
  body("preferences.theme").optional().isIn(["light", "dark"]).withMessage("Tema inválido"),
  body("preferences.notifications").optional().isBoolean().withMessage("Notificaciones debe ser un booleano"),

  body("user_id").notEmpty().withMessage("El user_id es obligatorio").isMongoId().withMessage("ID de usuario inválido"),
];

export const updateProfileValidation = [
  param("id").isMongoId().withMessage("ID de perfil inválido"),
  body("first_name").optional().trim().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("last_name").optional().trim().notEmpty().withMessage("El apellido no puede estar vacío"),
  body("phone").optional().isString(),
  body("preferences.language").optional().isIn(["es", "en"]).withMessage("Idioma inválido"),
  body("preferences.theme").optional().isIn(["light", "dark"]).withMessage("Tema inválido"),
  body("preferences.notifications").optional().isBoolean(),
];