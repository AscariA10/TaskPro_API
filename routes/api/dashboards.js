const express = require("express");
const { getAll, getById, addNew, updateById, removeById, updateCurrentDashboard } = require("../../controllers/dashboard");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:dashboardId", authenticate, getById);

router.post("/", authenticate, addNew);

router.put("/:dashboardId", authenticate, updateById);

router.patch("/:dashboardId", authenticate, updateCurrentDashboard)

router.delete("/:dashboardId", authenticate, removeById);

module.exports = router;
