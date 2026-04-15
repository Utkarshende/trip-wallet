// controllers/wallet.controller.js

import Wallet from "../models/Wallet.js";

// Add Contribution
export const addContribution = async (req, res) => {
  try {
    const { walletId, amount } = req.body;

    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Add contribution
    wallet.contributions.push({
      user: req.user,
      amount,
    });

    wallet.totalBudget += amount;
    wallet.balance += amount;

    await wallet.save();

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { walletId, title, amount, category } = req.body;

    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const expense = await Expense.create({
      wallet: walletId,
      title,
      amount,
      category,
      paidBy: req.user,
    });

    wallet.totalSpent += amount;
    wallet.balance -= amount;

    await wallet.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Wallet Details
export const getWalletDetails = async (req, res) => {
  try {
    const { walletId } = req.params;

    const wallet = await Wallet.findById(walletId)
      .populate("contributions.user", "name phone");

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};