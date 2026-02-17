const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Professor = require("./models/professor");
const Course = require("./models/course");
const app = express();

app.use(express.json());
app.use(cors()); 

//conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/workshop3db");
mongoose.connection
  .once("open", () => console.log("MongoDB conectado"))
  .on("error", (error) => console.log(error));

  
//------------------- Courses. Misma implementación de endpoints que usé en Workshop2 ------------------


//POST Course
app.post("/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();

    //guardO el curso en la bd. 201 = creado
    res.status(201).json(savedCourse); 
  } catch (error) {
    res.status(400).json({ message: error.message }); //400 = error del cliente
  }
});

//GET Courses
app.get("/courses", async (req, res) => {
  try {
    //devuelvo la lista json con el profesor. Uso populate para traer el objeto completo.
    const courses = await Course.find().populate("professorId");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//PUT Course
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

//DELETE Course
app.delete("/courses/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//------------------- Professors ------------------

//GET Professors
app.get("/professors", async (req, res) => {
  try {
    const professors = await Professor.find();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST Professor
app.post("/professors", async (req, res) => {
  try {
    const professor = new Professor(req.body);
    const saved = await professor.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PUT Professor
app.put("/professors/:id", async (req, res) => {
  try {
    const updated = await Professor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE Professor
app.delete("/professors/:id", async (req, res) => {
  try {
    await Professor.findByIdAndDelete(req.params.id);
    res.json({ message: "Professor deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//start server
app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
