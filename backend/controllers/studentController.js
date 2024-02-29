const express = require("express");
const mongoose = require("mongoose");

const Student = require("../models/studentsModels");
const Course = require("../models/coursesModels");

// get all students
const getAllStudents = async (req, res) => {
  const students = await Student.find({}).sort({ name: 1 }).populate("courses");
  console.log("Students with Courses:", students);
  res.status(200).json(students);
};

// get a student
const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student." });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(student);
};

// post a student
const createStudent = async (req, res) => {
  const { name, year, major } = req.body;

  try {
    const student = await Student.create({ name, year, major });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a student

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student." });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(student);
};

// update a student

const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student." });
  }

  const student = await Student.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!student) {
    return res.status(404).json({ error: "No such record exists." });
  }

  res.status(200).json(student);
};

// add courses to student

const addCourseToStudent = async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(studentId) ||
    !mongoose.Types.ObjectId.isValid(courseId)
  ) {
    return res.status(404).json({ error: "No such student or course." });
  }

  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ error: "No such record exists." });
  }

  if (!student.courses.includes(courseId)) {
    student.courses.push(courseId);
    console.log("COURSE PUSHED!");
  }

  await student.save();
  console.log("STUDENT SAVED!");

  res.status(200).json(student);
};

const deleteCourseFromStudent = async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(studentId) ||
    !mongoose.Types.ObjectId.isValid(courseId)
  ) {
    return res.status(404).json({ error: "No such student or course." });
  }

  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ error: "No such record exists." });
  }

  student.courses = student.courses.filter(
    (course) => course.toString() !== courseId
  );

  await student.save();

  res.status(200).json(student);
};

const filterByCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student." });
  }

  const students = await Student.find({ courses: id }).populate("courses");

  if (students.length === 0) {
    return res.status(404).json({ error: "No student takes the course." });
  }

  res.status(200).json(students);
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  addCourseToStudent,
  deleteCourseFromStudent,
  filterByCourse,
};
