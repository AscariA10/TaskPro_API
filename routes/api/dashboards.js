const express = require("express");
const {
  getAll,
  getById,
  addNew,
  updateById,
  removeById,
} = require("../../controllers/dashboard");

const router = express.Router();

router.get("/", getAll);

router.get("/:dashboardId", getById);

router.post("/", addNew);

router.put("/:dashboardId", updateById);

router.delete("/:dashboardId", removeById);

module.exports = router;
