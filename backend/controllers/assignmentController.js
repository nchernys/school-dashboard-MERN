const express = require("express");
const mongoose = require("mongoose");

const Course = require("../models/coursesModels");
const Assignment = require("../models/assignmentsModels");
const Student = require("../models/studentsModels");

// post an assignment
const createAssignment = async (req, res) => {
  const { title, description, course } = req.body;

  try {
    const assignment = await Assignment.create({ title, description, course });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all assignments
const getAllAssignments = async (req, res) => {
  const assignments = await Assignment.find({}).sort({ title: 1 });

  res.status(200).json(assignments);
};

// get an assignment
const getAssignment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such assignment" });
  }

  const assignment = await Assignment.findById(id);

  if (!assignment) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(assignment);
};

// delete an assignment
const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such assignment." });
  }

  const assignment = await Assignment.findOneAndDelete({ _id: id });

  if (!assignment) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(assignment);
};

// update a assignment
const updateAssignment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course." });
  }

  const assignment = await Assignment.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!assignment) {
    return res.status(404).json({ error: "No such record exists." });
  }

  res.status(200).json(assignment);
};

//filter assignments by course
const getAllAssignmentsByCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such course." });
    }
    const assignments = await Assignment.find({ course: id });

    if (assignments.length === 0) {
      return res.status(404).json({ error: "No such record exists." });
    }

    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// get all grades by students

const getAllGradesByStudents = async (req, res) => {
  const { id } = req.params; // assignment ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such assignment." });
  }

  const assignment = await Assignment.find({ _id: id });
  const grades = Assignment.students.grades;

  if (assignment.length === 0) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(grades);
};

// assign grade
const assignGrade = async (req, res) => {
  const { assignmentId } = req.params;
  const { studentId } = req.params;
  const { grade } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(assignmentId) ||
    !mongoose.Types.ObjectId.isValid(studentId)
  ) {
    return res.status(404).json({ error: "No such assignment." });
  }
  const assignment = await Assignment.findById({ _id: assignmentId });

  const studentToUpdate = assignment.students.find(
    (st) => st.student.toString() === studentId
  );

  if (!studentToUpdate) {
    return res
      .status(404)
      .json({ error: "Student not associated with the assignment." });
  }

  studentToUpdate.grade = grade;

  assignment.markModified("students");

  await assignment.save();

  res.status(200).json(assignment);
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignment,
  deleteAssignment,
  updateAssignment,
  getAllAssignmentsByCourse,
  getAllGradesByStudents,
  assignGrade,
};
