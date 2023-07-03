const express = require("express");

const {
  getById,
  updateById,
  addNew,
  removeById,
  setNewCardOwner,
} = require("../../controllers/card");
const authenticate = require("../../middlewares/authenticate");


const router = express.Router();

router.get("/:cardId", authenticate, getById);

router.post("/:columnId", authenticate, addNew);

router.put("/:cardId", authenticate, updateById);

router.delete("/:cardId", authenticate, removeById);

router.patch("/:cardId/owner/:columnId", authenticate, setNewCardOwner);

module.exports = router;
