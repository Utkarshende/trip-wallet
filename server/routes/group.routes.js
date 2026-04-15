// routes/group.routes.js

import express from "express";
import { createGroup, addMember } from "../controllers/group.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createGroup);
router.post("/add-member", protect, addMember);

export default router;