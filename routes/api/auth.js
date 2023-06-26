const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  updateTheme,
  updateProfile,
  getHelpEmail
} = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const schemas = require("../../models/validation-schemas/user-validation");
const uploadCloud = require("../../middlewares/uploadMiddlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/theme",
  authenticate,
  validateBody(schemas.themeSchema),
  updateTheme
);
router.put(
  "/profile",
  authenticate,
  uploadCloud.single("avatarURL"),
  validateBody(schemas.userSchema),
  updateProfile
);
router.post('/help', authenticate, validateBody(schemas.helpSchema), getHelpEmail)

module.exports = router;
