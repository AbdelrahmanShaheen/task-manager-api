require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
