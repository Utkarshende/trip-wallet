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