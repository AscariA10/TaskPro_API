const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/decorators");
const Dashboard = require("../models/dashboard");
const Column = require("../models/column");
const Card = require("../models/card");

async function getAll(req, res) {
  const { _id: owner } = req.user;
  const result = await Dashboard.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
}

async function getById(req, res) {
  const { dashboardId } = req.params;
  const dashboard = await Dashboard.findById(dashboardId);
  if (!dashboard) throw HttpError(404);
  const columns = await Column.find({ owner: dashboard._id });
  if (!columns) throw HttpError(404);

  const ArrayColumnsIds = columns.map(column => column._id);
  const cards = await Card.where("owner").in(ArrayColumnsIds).exec();

  // experiment

  const dashboardColumns = ArrayColumnsIds.map(element => {
    return {
      column: element,
      cards: cards.filter(card => {
        return card.owner.toString() === element.toString();
      }),
    };
  });
  const result = {
    dashboard,
    dashboardColumns,
  };
  // experiment

  res.json({
    result,
    // dashboard,
    // columns,
    // cards,
  });
}

async function addNew(req, res) {
  const { _id: owner } = req.user;
  const result = await Dashboard.create({ ...req.body, owner });
  res.status(201).json(result);
}

async function removeById(req, res) {
  const { dashboardId } = req.params;
  const deletedBoard = await Dashboard.findByIdAndRemove(dashboardId);
  const columns = await Column.find({ owner: dashboardId });
  const deletedColumn = await Column.deleteMany({ owner: dashboardId });
  const ArrayColumnsIds = columns.map((column) => column._id);
  const deletedCard = await Card.deleteMany({ owner: ArrayColumnsIds })
  if (!deletedBoard || !deletedColumn || !deletedCard || !columns) throw HttpError(404);
  res.json({
    deletedBoard,
    deletedColumn,
    deletedCard
  });
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
