
import userModel from "../models/auth.model.js";
import ApiError from "../utils/apiError.js";

import generateToken from "../utils/token.js";

// Register a new user and return the created user and a JWT token
export const registerService = async (data) => {
  const { username, email, password } = data;
  const isExisted = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isExisted) {
    throw new ApiError(409, "Email already exists");
  }
  const user = await userModel.create({
    username,
    email,
    password,
  });
  const token = await generateToken(user);
  return {
    user,
    token,
  };
};

// Authenticate a user by email and password and return a JWT token
export const loginService = async (data) => {
  const { email, password } = data;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = await generateToken(user);

  return {
    user,
    token,
  };
};