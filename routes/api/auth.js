const express = require("express");
const {
  register,
  login,
  //   getCurrent,
  //   logout,
  //   updateSubscription,
  //   updateAvatar,
} = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;
