// controllers/group.controller.js

import Group from "../models/Group.js";
import Wallet from "../models/Wallet.js";

// Create Group
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    const group = await Group.create({
      name,
      members: [{ user: req.user, role: "admin" }],
      createdBy: req.user,
    });

    const wallet = await Wallet.create({
      group: group._id,
    });

    group.wallet = wallet._id;
    await group.save();

    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Member
export const addMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findById(groupId);

    group.members.push({ user: userId });

    await group.save();

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};