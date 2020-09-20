const mongoose = require("mongoose");

const serverModule = require("./src/server");

require("dotenv").config();

const mongoURL = process.env.MONGOOSE_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

serverModule.start();
