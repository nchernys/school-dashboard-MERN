const express = require("express");
const {
  createStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  addCourseToStudent,
  deleteCourseFromStudent,
  filterByCourse,
} = require("../controllers/studentController");

const router = express.Router();

// filter students by course
router.get("/filter/:id", filterByCourse);

// get all students
router.get("/", getAllStudents);

// get a student
router.get("/:id", getStudent);

// post a student
router.post("/", createStudent);

// delete a student
router.delete("/:id", deleteStudent);

// update a student
router.patch("/:id", updateStudent);

router.patch("/addcourse/:studentId", addCourseToStudent);

router.patch("/deletecourse/:studentId", deleteCourseFromStudent);

module.exports = router;

// SAMPLE TO CHECK ROUTES BEFORE ADDING CONTROLLERS
//router.patch("/:id", (req, res) => {
//  res.json({ mssg: "UPDATE a //student" });
// });
