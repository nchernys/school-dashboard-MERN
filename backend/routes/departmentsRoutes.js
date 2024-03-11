const express = require("express");
const {
  getAllDepartments,
  getCoursesByDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getStudentsByDepartment,
} = require("../controllers/departmentController");

const router = express.Router();

// get all courses
router.get("/", getAllDepartments);

// get courses by department
router.get("/courses/:id", getCoursesByDepartment);

// post a department
router.post("/", createDepartment);

// delete a department
router.delete("/:id", deleteDepartment);

// update a department
router.patch("/:id", updateDepartment);

// get students by department
router.get("/students/:id", getStudentsByDepartment);

module.exports = router;
