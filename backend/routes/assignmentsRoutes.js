const express = require("express");
const {
  createAssignment,
  getAllAssignments,
  getAssignment,
  deleteAssignment,
  updateAssignment,
  getAllAssignmentsByCourse,
  getAllGradesByStudents,
  assignGrade,
} = require("../controllers/assignmentController");

const router = express.Router();

// get all assignments
router.get("/", getAllAssignments);

// get an assignment
router.get("/:id", getAssignment);

// post a assignment
router.post("/", createAssignment);

// delete a assignment
router.delete("/:id", deleteAssignment);

// update a assignment
router.patch("/:id", updateAssignment);

module.exports = router;
