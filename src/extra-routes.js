const express = require("express");

const bearerMiddleware = require("./auth/middleware/bearer");

const router = express.Router();

router.get("/secret", bearerMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
