const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const studentsRoutes = require("./routes/studentsRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const departmentsRoutes = require("./routes/departmentsRoutes");
const assignmentsRoutes = require("./routes/assignmentsRoutes");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/students", studentsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/assignments", assignmentsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB & listening on port 4000`);
    });
  })
  .catch((error) => {
    error;
  });

//npm init -y
//npm install -g nodemon
// npm install express
//npm install dotenv
//npm install mongoose (object data modeling)
