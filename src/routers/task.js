const express = require("express");
const ObjectID = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");
const router = new express.Router();
const Task = require("../models/task");
//Create task api endpoint
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
//.......................................................

//2.task Reading endpoints.
//2.1.Read all tasks api endpoint :
// GET /tasks?completed=true --> get all completed tasks.
// GET /tasks?limit=2&skip=3 --> get 2 tasks after the 1th three tasks.
// GET /tasks?sortBy=createdAt:desc --> get tasks ,sorted by the time they're created at in desc order.
router.get("/tasks", auth, async (req, res) => {
  try {
    let tasks;
    //query options for searching/paginating/sorting on tasks.
    const options = {};
    const sort = {};
    if (req.query.limit) options.limit = parseInt(req.query.limit);
    if (req.query.skip) options.skip = parseInt(req.query.skip);
    if (req.query.sortBy) {
      const sortOptions = req.query.sortBy.split(":");
      sort[sortOptions[0]] = sortOptions[1] === "desc" ? -1 : 1;
      options.sort = sort;
    }
    //************************************************** */
    if (req.query.completed) {
      tasks = await Task.find(
        {
          owner: req.user._id,
          completed: req.query.completed === "true" ? true : false,
        },
        null,
        options
      );
    } else {
      tasks = await Task.find(
        {
          owner: req.user._id,
        },
        null,
        options
      );
    }
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});
//2.2.Read a task by it's id :
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id))
    return res.status(406).send("Task with that invalid id does not exist!");

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//2.Update task by it's id :
router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  //handle error when updating by field that does not exist in the task
  const allowedUpdates = ["desc", "completed"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) res.status(400).send({ error: "invalid updates!" });
  //.........................................................................
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    //if a task with this id does not exist or another user who dose not login try to access someones tasks.
    if (!task) return res.status(404).send();
    //......................................
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//2.Delete task by it's id :
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndRemove({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
