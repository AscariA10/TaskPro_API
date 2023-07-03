const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const HttpError = require("../helpers/HttpError");
const sendEmail = require("../helpers/sendEmail");
const controllerWrapper = require("../helpers/decorators");

const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;

async function register(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = "";

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

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

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_KEY, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, {
    expiresIn: "7d"
  })
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
}
const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_TOKEN_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw HttpError(403, "Token invalid");
    }

    const payload = {
      id,
    }

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn: "2m" });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, { expiresIn: "7d" });

    res.json({
      accessToken,
      refreshToken,
    })
  }
  catch (error) {
    throw HttpError(403, error.message);
  }
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
  await User.findByIdAndUpdate(id, { accessToken: "", refreshToken: "" });
  res.status(204).json();
}

async function updateTheme(req, res) {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    select: "-password -createdAt -updatedAt",
  });
  res.json(result);
}

async function updateProfile(req, res) {
  const { _id } = req.user;

  //   if (!req.file && !req.body.name && !req.body.email && !req.body.password) {
  //     throw HttpError(400, "Enter the data for changes");
  //   }

  //   if (!req.file && !req.body.password) {
  //     const result = await User.findByIdAndUpdate(_id, req.body, {
  //       new: true,
  //       select: "-password -createdAt -updatedAt",
  //     });
  //     res.json(result);
  //     return;
  //   }

  //   if (!req.body.password) {
  //     const upload = req.file.path;
  //     const result = await User.findByIdAndUpdate(
  //       _id,
  //       {
  //         ...req.body,
  //         avatarURL: upload,
  //       },
  //       { new: true, select: "-password -createdAt -updatedAt" }
  //     );
  //     res.json(result);
  //     return;
  //   }

  if (!req.file) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await User.findByIdAndUpdate(
      _id,
      {
        ...req.body,
        password: hashedPassword,
      },
      { new: true, select: "-password -createdAt -updatedAt" }
    );
    res.json(result);
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const upload = req.file.path;

  const result = await User.findByIdAndUpdate(
    _id,
    {
      ...req.body,
      password: hashedPassword,
      avatarURL: upload,
    },
    { new: true, select: "-password -createdAt -updatedAt" }
  );
  res.json(result);
}

async function getHelpEmail(req, res) {
  const { email, comment } = req.body;

  const helpReq = {
    to: "taskpro.project@gmail.com",
    subject: "User need help",
    html: `<p> Email: ${email}, Comment: ${comment}</p>`,
  };
  await sendEmail(helpReq);
  const helpRes = {
    to: email,
    subject: "Support",
    html: `<p>Thank you for you request! We will consider your comment ${comment}</p>`,
  };
  await sendEmail(helpRes);

  res.json({
    message: "Reply email sent",
  });
}
module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateTheme: controllerWrapper(updateTheme),
  updateProfile: controllerWrapper(updateProfile),
  getHelpEmail: controllerWrapper(getHelpEmail),
  refresh,
};
