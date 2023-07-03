const express = require("express");
const authenticate = require('../../middlewares/authenticate')
const {
  getById,
  updateById,
  addNew,
  removeById,
} = require("../../controllers/column");

const router = express.Router();

router.get("/:columnId", authenticate, getById);

router.post("/:dashboardId", authenticate, addNew);

router.put("/:columnId", authenticate, updateById);

router.delete("/:columnId", authenticate, removeById);

module.exports = router;
