import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel = mongoose.model("User", userSchema);

export const createUser = async (userData) => {
  return await userModel.create(userData);
};

export const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

export const findUserById = async (id) => {
  return await userModel.findById(id);
};

export const updateUserTokens = async (id, tokens) => {
  return await userModel.findByIdAndUpdate(id, { tokens });
};
