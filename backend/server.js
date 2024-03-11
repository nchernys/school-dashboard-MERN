const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const studentsRoutes = require("./routes/studentsRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const departmentsRoutes = require("./routes/departmentsRoutes");
const assignmentsRoutes = require("./routes/assignmentsRoutes");
const gradesRoutes = require("./routes/gradesRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/students", studentsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/assignments", assignmentsRoutes);
app.use("/api/grades", gradesRoutes);
app.use("/api/users", usersRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB & listening on port ___`);
    });
  })
  .catch((error) => {
    error;
  });
