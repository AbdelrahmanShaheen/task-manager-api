// STARTING POINT FOR THE WHOLE APP.
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const express = require("express");
const { request } = require("express");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is Running on port " + port);
});
