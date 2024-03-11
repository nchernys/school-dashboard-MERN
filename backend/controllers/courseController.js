const express = require("express");
const mongoose = require("mongoose");

const Course = require("../models/coursesModels");

//filter courses by department
const filterByDepartment = async (req, res) => {
  try {
    const filter = req.query.department;

    const courses = await Course.find({ department: filter });

    if (courses.length === 0) {
      return res.status(404).json({ error: "No such record exists." });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.find({})
    .populate("department")
    .sort({ title: 1 });

  res.status(200).json(courses);
};

// get a Course
const getCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Course!!!" });
  }

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(course);
};

// post a course
const createCourse = async (req, res) => {
  const { title, department, description } = req.body;

  try {
    const course = await Course.create({ title, department, description });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Course." });
  }

  const course = await Course.findOneAndDelete({ _id: id });

  if (!course) {
    return res.status(404).json({ error: "No such record exists." });
  }
  res.status(200).json(course);
};

// update a Course

const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course." });
  }

  const course = await Course.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!course) {
    return res.status(404).json({ error: "No such record exists." });
  }

  res.status(200).json(course);
};

// add deprtment to a course

const addDepartment = async (req, res) => {
  const { id } = req.params;
  const { deptId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(deptId)
  ) {
    return res.status(404).json({ error: "No such record." });
  }

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: "No such course." });
  }

  course.department = deptId;

  await course.save();

  res.status(200).json(course);
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  filterByDepartment,
  addDepartment,
};
