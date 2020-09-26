const User = require("../models/users-model");
// check users roles and of they are allowed to do the action

module.exports = (action) => (req, res, next) => {
  const { user } = req; // comes from decodeToken
  const isAllowed = User.can(user.role, action);
  if (isAllowed) {
    next();
  } else {
    next("Access Denied!");
  }
};
