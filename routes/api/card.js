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

router.get("/:cardId", getById);

router.post("/:columnId", authenticate, addNew);

router.put("/:cardId", updateById);

router.delete("/:cardId", removeById);

router.patch("/:cardId/owner/:columnId", setNewCardOwner);

module.exports = router;
