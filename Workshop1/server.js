const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//Middleware para JSON
app.use(express.json());

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

//CONEXIÓN A MONGODB ATLAS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado ✅"))
  .catch(err => console.error("Error MongoDB:", err));

//Ruta de prueba
app.get("/", (req, res) => {
  res.send("API REST funcionando 🚀");
});

//Puerto
const PORT = 3000;

//Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

