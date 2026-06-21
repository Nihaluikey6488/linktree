import express from 'express'
import { registerController } from '../controllers/auth.controller.js'
import { registerValidate } from '../validators/auth.validator.js'
import validateRequest from '../middlewares/validateRequest.js'
let router=express.Router()
router.post("/register",registerValidate,validateRequest,registerController)
export default router