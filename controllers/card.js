const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/decorators");
const Card = require("../models/card");

async function getById(req, res) {
  const { cardId } = req.params;
  const result = await Card.findById(cardId);
  if (!result) throw HttpError(404);
  res.json(result);
}

async function addNew(req, res) {
  const { columnId } = req.params;
  const result = await Card.create({ ...req.body, owner: columnId });
  res.status(201).json(result);
}

async function removeById(req, res) {
  const { cardId } = req.params;
  const result = await Card.findByIdAndRemove(cardId);
  if (!result) throw HttpError(404);
  res.json(result);
}

async function updateById(req, res) {
  const { cardId } = req.params;
  const result = await Card.findByIdAndUpdate(cardId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);
  res.json(result);
}

module.exports = {
  getById: controllerWrapper(getById),
  addNew: controllerWrapper(addNew),
  removeById: controllerWrapper(removeById),
  updateById: controllerWrapper(updateById),
};
