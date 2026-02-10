const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Course = require("./models/course");

const app = express();

app.use(express.json());
app.use(cors());

//conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/workshop2db");

mongoose.connection
  .once("open", () => console.log("MongoDB conectado"))
  .on("error", (error) => console.log(error));

//POST
app.post("/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//PUT
app.put("/courses/:id", async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
app.delete("/courses/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//start server
app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
