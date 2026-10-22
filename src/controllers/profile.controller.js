import { matchedData } from "express-validator";
import { ProfileModel } from "../models/index.js";

export const createProfile = async (req, res) => {
  try {
    const data = matchedData(req);
    const newProfile = await ProfileModel.create(data);

    return res.status(201).json({
      msg: "Perfil creado correctamente",
      data: newProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllProfiles = async (req, res) => {
  try {

    const profiles = await ProfileModel.find({ deleted_at: null }).populate("user_id", "username email");
    return res.status(200).json({ data: profiles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await ProfileModel.findById(id).populate("user_id", "username email");

    if (!profile || profile.deleted_at !== null) {
      return res.status(404).json({ msg: "Perfil no encontrado" });
    }

    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);

    const updatedProfile = await ProfileModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProfile) return res.status(404).json({ msg: "Perfil no encontrado" });

    return res.status(200).json({ data: updatedProfile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;


    const deletedProfile = await ProfileModel.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { returnDocument: "after" }
    );

    if (!deletedProfile) return res.status(404).json({ msg: "Perfil no encontrado" });

    return res.status(200).json({ msg: "Perfil eliminado lógicamente", data: deletedProfile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};