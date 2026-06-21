import { body } from "express-validator";

export const registerValidate = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const loginValidate = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];