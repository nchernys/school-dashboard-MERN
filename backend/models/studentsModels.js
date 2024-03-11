const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

// the word in the "" is the model we use to Student.find()
