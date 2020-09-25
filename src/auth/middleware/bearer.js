/* eslint-disable consistent-return */
const User = require("../models/users-model");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return next("authorization header is empty !");
  const auth = req.headers.authorization.split(" ");
  if (auth[0] === "Bearer") {
    const token = auth[1];
    User.decodeToken(token).then((userData) => {
      req.user = userData;
      next();
    }).catch((err) => next(err.message));
  } else {
    return next("Invalid Bearer!!");
  }
};
