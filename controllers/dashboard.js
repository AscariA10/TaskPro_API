const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/decorators");
const Dashboard = require("../models/dashboard");
const Column = require("../models/column");

async function getAll(req, res) {
  // const { _id: owner } = req.user;
  const owner = "test_owner_id_2";
  const result = await Dashboard.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
}

async function getById(req, res) {
  const { dashboardId } = req.params;
  const result = await Dashboard.findById(dashboardId);
  const columns = await Column.find({ owner: result._id });

  if (!result) throw HttpError(404);
  res.json({
    dashboard: result,
    columns,
  });
}

async function addNew(req, res) {
  // const { _id: owner } = req.user;
  const owner = "test_owner_id_2";
  const result = await Dashboard.create({ ...req.body, owner });
  res.status(201).json(result);
}

async function removeById(req, res) {
  const { dashboardId } = req.params;
  const result = await Dashboard.findByIdAndRemove(dashboardId);
  if (!result) throw HttpError(404);
  res.json({ message: "Board was deleted." });
}

async function updateById(req, res) {
  const { dashboardId } = req.params;
  const result = await Dashboard.findByIdAndUpdate(dashboardId, req.body, {
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
