import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema(
  {
    employee_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    preferences: {
      language: {
        type: String,
        enum: ["es", "en"],
        default: "es",
      },
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProfileModel = model("Profile", profileSchema);