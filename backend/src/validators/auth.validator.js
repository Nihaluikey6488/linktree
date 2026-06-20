import { body } from "express-validator";

export const registerValidate = [
  body("username").isEmpty().trim().withMessage("Username is required").body('email'),
  body('email').trim().isEmail().withMessage("Valid Email is required"),
  body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")

];

export const loginValidator=[
    body('identifier')
    .trim()
    .notEmpty()
    .withMessage("Usernama or Email is required"),
    body('password')
    .notEmpty()
    .withMessage("Password is required")

]