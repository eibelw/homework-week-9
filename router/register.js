const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", (req, res) => {
  const token = jwt.sign(
    {
      userID: 10,
      role: "admin",
    },
    "nePyrtWqBf",
    { expiresIn: "1h" }
  );
  res.json({
    token: token,
  });
});

router.get("/verify/:token", (req, res) => {
  const data = jwt.verify(req.params.token, "nePyrtWqBf");
  res.json({
    data: data,
  });
});

module.exports = router;
