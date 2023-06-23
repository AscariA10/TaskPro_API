const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/decorators");

const { JWT_TOKEN_KEY } = process.env;

async function register(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashdPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashdPassword });

  res.status(201).json({
    email: newUser.email,
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, JWT_TOKEN_KEY, {
    expiresIn: "23h",
  });
  res.status(200).json({
    token,
    //   user: {
    //     email: user.email,
    //     subscription: user.subscription,
    //   },
  });
}

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  //   getCurrent: ctrlWrapper(getCurrent),
  //   logout: ctrlWrapper(logout),
  //   updateSubscription: ctrlWrapper(updateSubscription),
  //   updateAvatar: ctrlWrapper(updateAvatar),
};
