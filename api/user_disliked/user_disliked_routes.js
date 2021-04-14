const express = require("express");
const User = require("./user_disliked_model");
const router = express.Router();
//Get All users friends
router.get("/", async (req, res, next) => {
  try {
    const rows = await User.getAll();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

//Post a new users friend
router.post("/", async (req, res, next) => {
  try {
    const rows = await User.post(req.body);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

//Get a users friends by ID
router.get("/:id", async (req, res, next) => {
  try {
    const rows = await User.getByID(req.params.id);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

//Edit a users friend by ID
router.put("/:id", async (req, res, next) => {
  try {
    const rows = await User.edit(req.params.id, req.body);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

//Delete a users friend by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await User.delete(req.params.id);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
