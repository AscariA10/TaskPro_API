const express = require("express");
const { getAll, getById, addNew, updateById, removeById } = require("../../controllers/dashboard");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:dashboardId", getById);

router.post("/", authenticate, addNew);

router.put("/:dashboardId", updateById);

router.delete("/:dashboardId", removeById);

module.exports = router;
