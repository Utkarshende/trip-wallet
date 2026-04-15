// models/Wallet.js

import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  totalBudget: {
    type: Number,
    default: 0,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  contributions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: Number,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Wallet", walletSchema);