import { model, Schema } from "mongoose";

const technologySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


technologySchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "technologies",
});

export const TechnologyModel = model("Technology", technologySchema);