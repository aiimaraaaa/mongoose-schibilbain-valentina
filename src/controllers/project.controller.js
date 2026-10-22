import { matchedData } from "express-validator";
import { ProjectModel, TechnologyModel } from "../models/index.js";

export const createProject = async (req, res) => {
  try {
    const data = matchedData(req);
    const newProject = await ProjectModel.create(data);

    return res.status(201).json({ msg: "Proyecto creado correctamente", data: newProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find()
      .populate("leader_id", "username email")
      .populate("technologies", "name");

    return res.status(200).json({ data: projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById(id)
      .populate("leader_id", "username email")
      .populate("technologies", "name");

    if (!project) return res.status(404).json({ msg: "Proyecto no encontrado" });

    return res.status(200).json({ data: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);

    const updatedProject = await ProjectModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProject) return res.status(404).json({ msg: "Proyecto no encontrado" });

    return res.status(200).json({ data: updatedProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (!deletedProject) return res.status(404).json({ msg: "Proyecto no encontrado" });

    return res.status(200).json({ msg: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};


export const linkTechnology = async (req, res) => {
  try {
    const { projectId, technologyId } = req.params;

    const project = await ProjectModel.findById(projectId);
    const technology = await TechnologyModel.findById(technologyId);

    if (!project) return res.status(404).json({ msg: "Proyecto no encontrado" });
    if (!technology) return res.status(404).json({ msg: "Tecnología no encontrada" });


    const isAlreadyLinked = project.technologies.some(
      (id) => id.toString() === technologyId
    );
    if (isAlreadyLinked) {
      return res.status(400).json({ msg: "La tecnología ya está vinculada al proyecto" });
    }


    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { technologies: technologyId } },
      { returnDocument: "after" }
    ).populate("technologies", "name");

    return res.status(200).json({
      msg: "Tecnología vinculada correctamente",
      data: updatedProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};