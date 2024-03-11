const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// get all users
router.get("/", getAllUsers);

// get a user
router.get("/:id", getUser);

// post a user
router.post("/", createUser);

// delete a user
router.delete("/:id", deleteUser);

// update a user
router.patch("/:id", updateUser);

// verify login info
router.post("/login", loginUser);

module.exports = router;

// SAMPLE TO CHECK ROUTES BEFORE ADDING CONTROLLERS
//router.patch("/:id", (req, res) => {
//  res.json({ mssg: "UPDATE a //student" });
// });
