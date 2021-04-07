const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const User = require("./user_information_model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secret");

//Register
router.post("/register", async (req, res) => {
  const credentials = req.body;

  const hashRounds = 8;

  //hashing the pass
  const hash = bcryptjs.hashSync(credentials.user_password, hashRounds);
  credentials.user_password = hash;

  //save the user to the database

  await User.post(credentials)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//Login

router.post("/login", (req, res) => {
  const { user_username, user_password } = req.body;

  User.findBy({ user_username: user_username })
    .then(([user]) => {
      // compare the password the hash stored in the database
      if (user && bcryptjs.compareSync(user_password, user.user_password)) {
        const token = makeToken(user);

        res.status(200).json({
          token,
          user_username: user.user_username,
          user_id: user.user_id,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

const makeToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.user_username,
  };
  const options = {
    expiresIn: "1hr",
  };
  return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;
