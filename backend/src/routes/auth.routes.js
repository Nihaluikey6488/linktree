import express from 'express'
import { registerController,loginController } from '../controllers/auth.controller.js'
import { registerValidate,loginValidate } from '../validators/auth.validator.js'
import validateRequest from '../middlewares/validateRequest.js'
let router=express.Router()
router.post("/register",registerValidate,validateRequest,registerController)
router.post("/login",loginValidate,validateRequest,loginController)

export default router