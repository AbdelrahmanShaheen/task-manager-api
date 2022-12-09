const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  console.log("Auth middleware ....");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "one_piece");
    const _id = decodedToken._id;
    const user = await User.findOne({ _id, "tokens.token": token });
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate." });
  }
};

module.exports = auth;
