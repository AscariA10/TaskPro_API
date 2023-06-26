const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const User = require("../models/user");
const { JWT_TOKEN_KEY } = process.env;

async function authenticate(req, res, next) {
  const { authorization = " " } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_TOKEN_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
}

module.exports = authenticate;
