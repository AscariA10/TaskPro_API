const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  updateTheme,
  //   updateAvatar,
} = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, validateBody(schemas.themeSchema), updateTheme);

module.exports = router;
