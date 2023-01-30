const express = require("express");
const ObjectID = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");
const router = new express.Router();
const User = require("../models/user");
const Task = require("../models/task");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
//check credential for login api endpoint / Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});
//Create user api endpoint / SignUp
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.name, user.email);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// user logout api
router.post("/users/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
// user logout from all sessions
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
//1.user Reading endpoints
//1.1.Read Users api endpoint :
router.get("/users/me", auth, async (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

//1.Update user by his id :
router.patch("/users/me", auth, async (req, res) => {
  //handle error when updating by field that does not exist in the user.
  const allowedUpdates = ["name", "age", "email", "password"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" });
  //..................................................................
  try {
    const user = req.user;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
//1.Delete user by his id :
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});
//file upload config
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("The uploaded file should be an image"));
    }
    cb(undefined, true);
  },
});
//........................................................
// Creating/updating an avatar(image) to the current user :
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// Deleting an avatar(image) from the current user :
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// Fetching/Getting an image/avatar by id :
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user || !user.avatar) {
      throw Error();
    }
    res.set("content-type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
