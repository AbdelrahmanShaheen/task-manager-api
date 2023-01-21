const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "ahmed",
  email: "ahmed28@gmail.com",
  password: "ahmed1!!3",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "hamada",
  email: "hamada@gmail.com",
  password: "hamada!!3",
  tokens: [{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET) }],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  desc: "First task",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  desc: "Second task",
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  desc: "Third task",
  completed: true,
  owner: userTwoId,
};

setupDatabase = async () => {
  // console.log("before testing");
  await Task.deleteMany();
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();

  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = { setupDatabase, userOne, userOneId, userTwo, taskOne };
