const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
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
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      name: user.name,
      theme: user.theme,
    },
  });
}

async function getCurrent(req, res) {
  const { name, email, theme } = req.user;
  res.json({
    name,
    email,
    theme,
  });
}

async function logout(req, res) {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).json();
}

async function updateTheme(req, res) {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.json(result);
}

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateTheme: controllerWrapper(updateTheme),
  //   updateAvatar: ctrlWrapper(updateAvatar),
};
