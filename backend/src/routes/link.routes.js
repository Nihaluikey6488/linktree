import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createLinkController, getLinksByUsernameController, incrementLinkClickController } from '../controllers/links.controller.js'
import { getAnalyticsByUsernameController } from '../controllers/analytics.controller.js'

const router = express.Router()

// Create a link (authenticated)
router.post("/", authMiddleware, createLinkController)

// Get links for a username (authenticated). Consider exposing a public variant for unauthenticated viewers.
router.get("/:username", authMiddleware, getLinksByUsernameController)

// Get analytics for the authenticated owner of the username
router.get("/:username/analytics", authMiddleware, getAnalyticsByUsernameController)

// Increment link clicks (authenticated). To support anonymous clicks, implement a public click route.
router.patch("/:linkId/click", authMiddleware, incrementLinkClickController)

export default router
