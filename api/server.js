const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("./routes")(app);
const db = require("./models");

app.get("/", (req, res) => {
  res.send("Welcome to Task-App where you can manage your tasks!");
});

db.sequelize
  .sync() //{ force: true }
  .then(() => {
    console.log("Database Initialized!");
  })
  .catch((err) => console.log(`Error Occured While Connecting db ${err}`));

app.listen(3000, () => {
  console.log(`Todo app listening at http://localhost:3000`);
});
