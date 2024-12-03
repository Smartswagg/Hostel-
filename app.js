const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Routes
const studentRoutes = require('./routes/studentRoutes');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const localDBUrl = "mongodb://127.0.0.1:27017/hotelMangement";

const port = 3000;

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

main()
   .then((res) => {
      console.log("connection successful");
   })
   .catch((err) => console.log(err));

async function main() {
   await mongoose.connect(localDBUrl);
}

app.get("/", (req, res) => {
   res.render("login.ejs");
});

app.use("/student", studentRoutes);

// Middlewares
app.use((err, req, res, next) => {
   let { status = 500, message = "some error" } = err;
   res.status(status).send(message);
});
