/* eslint-disable no-use-before-define */
const axios = require("axios");
const User = require("../models/users-model.js");

const { CLIENT_ID, CLIENT_SECRET } = process.env;

module.exports = async function (req, res, next) {
  try {
    const { code } = req.query;
    console.log("(1) CODE:", code);

    const remoteToken = await exchangeCodeForToken(code);
    console.log("(2) ACCESS TOKEN:", remoteToken);

    const remoteUser = await getRemoteUserInfo(remoteToken);
    console.log("(3) GITHUB USER", remoteUser);

    const [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    console.log("(4) LOCAL USER", user);

    next();
  } catch (e) { next(`ERROR: ${e.message}`); }
};

async function exchangeCodeForToken(code) {
  const tokenResponse = await axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
    headers: {
      accept: "application/json",
    },
  });

  const accessToken = tokenResponse.data.access_token;
  return accessToken;
}

async function getRemoteUserInfo(token) {
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const user = userResponse.data;
  return user;
}

async function getUser(remoteUser) {
  const userRecord = {
    username: remoteUser.login,
    password: "oauthpassword",
  };
  // update upsert
  await User.updateOne(
    { username: remoteUser.login },
    { $set: userRecord },
    { upsert: true }, // If set to true, creates a new document when no document matches the query criteria
  );
  const user = new User({ username: remoteUser.login });
  const token = user.generateToken();
  return [user, token];
}
