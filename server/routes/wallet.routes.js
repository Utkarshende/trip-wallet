// routes/wallet.routes.js

import express from "express";
import {
  addContribution,
  addExpense,
  getWalletDetails,
} from "../controllers/wallet.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/contribute", protect, addContribution);
router.post("/expense", protect, addExpense);
router.get("/:walletId", protect, getWalletDetails);

export default router;