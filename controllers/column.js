const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/decorators");
const Card = require("../models/card");
const Column = require("../models/column");

async function getById(req, res) {
  const { columnId } = req.params;
  const result = await Column.findById(columnId);
  const cards = await Card.find({ owner: result._id });
  if (!result) throw HttpError(404);
  res.json({
    column: result,
    cards,
  });
}

async function addNew(req, res) {
  const { dashboardId } = req.params;
  const result = await Column.create({ ...req.body, owner: dashboardId });
  res.status(201).json(result);
}

async function removeById(req, res) {
  const { columnId } = req.params;
  const result = await Column.findByIdAndRemove(columnId);
  if (!result) throw HttpError(404);
  res.json({ message: "Column was deleted." });
}

async function updateById(req, res) {
  const { columnId } = req.params;
  const result = await Column.findByIdAndUpdate(columnId, req.body, {
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
