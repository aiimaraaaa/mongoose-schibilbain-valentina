import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
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

export const UserModel = model("User", userSchema);