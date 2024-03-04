const express = require("express");
const {
  getAllGrades,
  getGrade,
  createGrade,
  deleteGrade,
  updateGrade,
} = require("../controllers/gradeController");

const router = express.Router();

// get all grades
router.get("/", getAllGrades);

// get an grade
router.get("/:id", getGrade);

// post a grade
router.post("/", createGrade);

// delete a grade
router.delete("/:id", deleteGrade);

// update a grade
router.patch("/:id", updateGrade);

module.exports = router;
