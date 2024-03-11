const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/usersModels");

// get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ name: 1 });
  res.status(200).json(users);
};

// get a student
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user." });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(user);
};

// post a user
const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("USER ERROR");
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user." });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such user." });
  }

  res.status(200).json(user);
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such department." });
  }

  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!user) {
    return res.status(404).json({ error: "No such record exists." });
  }

  res.status(200).json(user);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(404).json({ error: "No such record exists." });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
};
