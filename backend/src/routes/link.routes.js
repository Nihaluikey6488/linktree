import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createLinkController, getLinksByUsernameController, incrementLinkClickController } from '../controllers/links.controller.js'
const router=express.Router()

router.post("/", authMiddleware,createLinkController)
router.get("/:username", authMiddleware,getLinksByUsernameController)
router.patch("/:linkId/click", authMiddleware,incrementLinkClickController)

export default router
