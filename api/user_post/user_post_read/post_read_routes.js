const express = require("express");
const User = require("./post_read_model");
const router = express.Router();
//Get All users with information
router.get("/", async (req, res, next) => {
  try {
    const rows = await User.getAll();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

//Post a new users information
router.post("/", async (req, res, next) => {
  try {
    const rows = await User.post(req.body);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

//Get a users information by ID
router.get("/:id", async (req, res, next) => {
  try {
    const rows = await User.getByID(req.params.id);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

//Delete a users information by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await User.delete(req.params.id);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
