const express = require("express");
const {
  register,
  login,
  refresh,
  getCurrent,
  logout,
  updateTheme,
  updateProfile,
  getHelpEmail,
  googleAuth,
} = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const passport = require("../../middlewares/google-authenticate");
const schemas = require("../../models/validation-schemas/user-validation");
const uploadCloud = require("../../middlewares/uploadMiddlewares");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.post("/refresh", validateBody(schemas.refreshSchema), refresh);

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
  validateBody(schemas.registerSchema),
  updateProfile
);
router.post(
  "/help",
  authenticate,
  validateBody(schemas.helpSchema),
  getHelpEmail
);

module.exports = router;
