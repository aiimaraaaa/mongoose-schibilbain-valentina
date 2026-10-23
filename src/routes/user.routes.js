import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createUserValidation,
  updateUserValidation,
  idParamValidation,
} from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.post("/users", createUserValidation, validate, createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", idParamValidation, validate, getUserById);
userRouter.put("/users/:id", updateUserValidation, validate, updateUser);
userRouter.delete("/users/:id", idParamValidation, validate, deleteUser);