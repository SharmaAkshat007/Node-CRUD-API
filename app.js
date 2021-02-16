const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Loading dotenv
require("dotenv").config();

//DB connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((onConnect) => {
    console.log("Database is connnected successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares
app.use(express.json());

//Router
app.use("/posts", require("./routes/posts.js"));

//DefaultRouter
app.use("/", (req, res) => {
  res.status(200).send("CRUD API");
});

//PORT
const PORT = process.env.PORT || 3000;

//Server starting
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});
