// models/Expense.js

import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
  title: {
    type: String, // e.g., "Lunch", "Taxi"
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["food", "travel", "stay", "other"],
    default: "other",
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receipt: {
    type: String, // image URL later
  },
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);