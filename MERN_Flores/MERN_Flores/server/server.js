const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Student = require("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/student", async (req, res) => {
  const student = new Student(req, body);
  await student.save();
  res.json(student);
});

app.delete("/student/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.json(deletedStudent);
  } catch (err) {
    res.status(400).json({ message: "Failed to delete student" });
  }
});


app.put("/student/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: "Failed to update student" });
  }
});

app.get("/student", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});