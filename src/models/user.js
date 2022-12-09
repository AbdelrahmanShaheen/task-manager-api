const mongoose = require("mongoose");
const validator = require("validator");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task.js");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a positive number");
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 6)
        throw new Error("Password length must be greater than 6");
      if (value.toLowerCase().includes("password"))
        throw new Error("Password is invalid");
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});
userSchema.methods.toJSON = function () {
  user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "one_piece");
  user.tokens.push({ token });
  try {
    await user.save();
    return token;
  } catch (error) {
    throw error;
  }
};
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Unable to login");

    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) throw new Error("Unable to login");
    return user;
  } catch (error) {
    throw error;
  }
};
//Delete user tasks when user is removed..(middleware)
userSchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    const user = this;
    console.log(user._id);
    await Task.deleteMany({ owner: user._id });
    console.log("remove tasks");
    next();
  }
);
//hash the plain text password before saving (It's a middleware).
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bycript.hash(user.password, 8);
  console.log(user);
  console.log(`just before saving!`);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
