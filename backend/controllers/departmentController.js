const express = require("express");
const mongoose = require("mongoose");

const Course = require("../models/coursesModels");
const Student = require("../models/studentsModels");
const Department = require("../models/departmentsModels");

// get all departments
const getAllDepartments = async (req, res) => {
  const departments = await Department.find({}).sort({ title: 1 });
  res.status(200).json(departments);
};

// get courses by deparment
const getCoursesByDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such deparment" });
  }

  const courses = await Course.find({ department: id });

  if (courses.length === 0) {
    return res.status(404).json({ error: "No such courses exist." });
  }
  res.status(200).json(courses);
};

// post a department
const createDepartment = async (req, res) => {
  const { title } = req.body;

  try {
    const department = await Department.create({ title });
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a department
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such department." });
  }

  const department = await Department.findOneAndDelete({ _id: id });

  if (!department) {
    return res.status(404).json({ error: "No such department found." });
  }
  res.status(200).json(department);
};

// update a Course

const updateDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such department." });
  }

  const department = await Department.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!department) {
    return res.status(404).json({ error: "No such record exists." });
  }

  res.status(200).json(department);
};

// get students by department

const getStudentsByDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such department." });
  }

  const courses = await Course.find({ department: id });
  const students = await Student.find({ courses: courses });

  if (courses.length === 0) {
    return res.status(404).json({ error: "No courses found." });
  }

  if (students.length === 0) {
    return res.status(404).json({ error: "This department has no students." });
  }
  res.status(200).json(students);
};

module.exports = {
  getAllDepartments,
  getCoursesByDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getStudentsByDepartment,
};
