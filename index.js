const mongoose = require("mongoose");

require("dotenv").config();

const serverModule = require("./src/server");

const mongoURL = process.env.MONGOOSE_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

serverModule.start();
