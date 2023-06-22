const { HttpError } = require("../helpers/HttpError");
const { controllerWrapper } = require("../helpers/decorators");
const Board = require("../models/dasboards");

async function getAll(req, res) {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
}

async function getById(req, res) {
  const { boardId } = req.params;
  const result = await Board.findById(boardId);
  if (!result) throw HttpError(404);
  res.json(result);
}

async function addNew(req, res) {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });
  res.status(201).json(result);
}

async function removeById(req, res) {
  const { boardId } = req.params;
  const result = await Board.findByIdAndRemove(boardId);
  if (!result) throw HttpError(404);
  res.json({ message: "Board was deleted." });
}

async function updateById(req, res) {
  const { boardId } = req.params;
  const result = await Board.findByIdAndUpdate(boardId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);
  res.json(result);
}

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  addNew: controllerWrapper(addNew),
  removeById: controllerWrapper(removeById),
  updateById: controllerWrapper(updateById),
};
