import { matchedData } from "express-validator";
import { UserModel, ProfileModel } from "../models/index.js";

export const createUser = async (req, res) => {
  try {
    const data = matchedData(req);
    const newUser = await UserModel.create(data);

    return res.status(201).json({
      msg: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    if (!updatedUser) return res.status(404).json({ msg: "Usuario no encontrado" });

    return res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;


    await ProfileModel.findOneAndDelete({ user_id: id });

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ msg: "Usuario no encontrado" });

    return res.status(200).json({ msg: "Usuario y su perfil asociado eliminados" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};