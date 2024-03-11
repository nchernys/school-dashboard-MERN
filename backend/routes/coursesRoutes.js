const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  filterByDepartment,
  addDepartment,
} = require("../controllers/courseController");

const router = express.Router();

//filter by department
router.get("/filter", filterByDepartment);

// get all courses
router.get("/", getAllCourses);

// get a course
router.get("/:id", getCourse);

// post a course
router.post("/", createCourse);

// delete a course
router.delete("/:id", deleteCourse);

// update a course
router.patch("/:id", updateCourse);

//add a department
router.patch("/dept/:id", addDepartment);

module.exports = router;

// SAMPLE TO CHECK ROUTES BEFORE ADDING CONTROLLERS
//router.patch("/:id", (req, res) => {
//  res.json({ mssg: "UPDATE a //Course" });
// });
