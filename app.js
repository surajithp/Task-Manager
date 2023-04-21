const express = require("express");
const app = express();

const tasksRoute = require("./routes/tasks")

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/tasks', tasksRoute);


module.exports = app;
