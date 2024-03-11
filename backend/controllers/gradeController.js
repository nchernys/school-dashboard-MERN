const express = require("express");
const mongoose = require("mongoose");

const Grade = require("../models/gradesModels");
const Course = require("../models/coursesModels");
const Assignment = require("../models/assignmentsModels");
const Student = require("../models/studentsModels");

// get all grades
const getAllGrades = async (req, res) => {
  const grades = await Grade.find({});

  res.status(200).json(grades);
};

// post a grade
const createGrade = async (req, res) => {
  const { assignment, student, score } = req.body;

  try {
    const grade = await Grade.create({ assignment, student, score });
    res.status(200).json(grade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a grade
const getGrade = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such grade" });
  }

  const grade = await Grade.findById(id);

  if (!grade) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(grade);
};

// delete a grade
const deleteGrade = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such assignment." });
  }

  const grade = await Grade.findOneAndDelete({ _id: id });

  if (!grade) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(grade);
};

// update a grade
const updateGrade = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course." });
  }

  const grade = await Grade.findOneAndUpdate(
    { _id: id },
    { $set: { score: req.body.score } },
    { new: true }
  );

  if (!grade) {
    return res.status(404).json({ error: "No such record exists." });
  }

  res.status(200).json(grade);
};

module.exports = {
  getAllGrades,
  getGrade,
  createGrade,
  deleteGrade,
  updateGrade,
};
