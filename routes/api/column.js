const express = require("express");
const {
  getById,
  updateById,
  addNew,
  removeById,
} = require("../../controllers/column");

const router = express.Router();

router.get("/:columnId", getById);

router.post("/:dashboardId", addNew);

router.put("/:columnId", updateById);

router.delete("/:columnId", removeById);

module.exports = router;
