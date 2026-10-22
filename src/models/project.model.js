import { model, Schema, Types } from "mongoose";

const projectSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["planning", "in_progress", "paused", "finished"],
      default: "planning",
    },
    start_date: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    leader_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    technologies: [
      {
        type: Types.ObjectId,
        ref: "Technology",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProjectModel = model("Project", projectSchema);