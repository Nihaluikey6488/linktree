import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createLinkController, getLinksByUsernameController, incrementLinkClickController } from '../controllers/links.controller.js'
import { getAnalyticsByUsernameController } from '../controllers/analytics.controller.js'
const router=express.Router()

router.post("/", authMiddleware,createLinkController)
router.get("/:username", authMiddleware,getLinksByUsernameController)
router.get("/:username/analytics", authMiddleware, getAnalyticsByUsernameController)
router.patch("/:linkId/click", authMiddleware,incrementLinkClickController)

export default router
