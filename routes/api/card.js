const express = require("express");
const {
  getById,
  updateById,
  addNew,
  removeById,
} = require("../../controllers/column");

const router = express.Router();

router.get("/:cardId", getById);

router.post("/:columnId", addNew);

router.put("/:cardId", updateById);

router.delete("/:cardId", removeById);

module.exports = router;
