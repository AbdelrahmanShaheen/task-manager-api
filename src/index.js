// STARTING POINT FOR THE WHOLE APP.
const app = require("./app");
const port = process.env.PORT;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.listen(port, () => {
  console.log("Server is Running on port " + port);
});
