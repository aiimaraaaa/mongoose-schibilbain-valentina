import { matchedData } from "express-validator";
import { TechnologyModel } from "../models/index.js";

export const createTechnology = async (req, res) => {
  try {
    const data = matchedData(req);
    const newTech = await TechnologyModel.create(data);

    return res.status(201).json({ msg: "Tecnología creada correctamente", data: newTech });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllTechnologies = async (req, res) => {
  try {

    const technologies = await TechnologyModel.find().populate("projects");
    return res.status(200).json({ data: technologies });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getTechnologyById = async (req, res) => {
  try {
    const { id } = req.params;
    const tech = await TechnologyModel.findById(id).populate("projects");

    if (!tech) return res.status(404).json({ msg: "Tecnología no encontrada" });

    return res.status(200).json({ data: tech });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);

    const updatedTech = await TechnologyModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedTech) return res.status(404).json({ msg: "Tecnología no encontrada" });

    return res.status(200).json({ data: updatedTech });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTech = await TechnologyModel.findByIdAndDelete(id);

    if (!deletedTech) return res.status(404).json({ msg: "Tecnología no encontrada" });

    return res.status(200).json({ msg: "Tecnología eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};