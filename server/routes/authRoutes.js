const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

router.get("/login-test", (req, res) => {
  res.send("Login route is loaded");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;