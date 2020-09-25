/* eslint-disable consistent-return  */
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // fullname: { type: String, required: true },
  // email: { type: String, required: true },
});

schema.plugin(uniqueValidator);

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.authenticateUser = async function () {
  const { username, password } = this;
  const user = await this.constructor.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return { isValid, user };
};

schema.methods.generateToken = async function () {
  const { username } = this;
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  return token;
};

schema.statics.decodeToken = function (token) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("as");
      this.findOne({ username: decoded.username }).then((user) => {
        if (!user) return reject(new Error("invalidToken!"));
        resolve(user);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = mongoose.model("users", schema); // collection name - its schema
