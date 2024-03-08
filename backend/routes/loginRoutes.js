const express = require("express");
const { verifyUser } = require("../controllers/loginController");

const router = express.Router();

// verify the user
router.post("/", verifyUser);

module.exports = router;
