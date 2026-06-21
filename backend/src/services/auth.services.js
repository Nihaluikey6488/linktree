
import userModel from "../models/auth.model.js";
import ApiError from "../utils/apiError.js";

import generateToken from "../utils/token.js";
export const registerService = async (data) => {
  let { username, email, password } = data;
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
  let token = await generateToken(user);
  return {
    isExisted,
    token,
  };
};


export const loginService = async (data) => {
  const { email, password } = data;

  const user = await userModel.findOne({
    email
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