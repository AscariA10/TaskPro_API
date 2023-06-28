const { Schema, model } = require("mongoose");

const authenticate = require("../middlewares/authenticate");

const MongooseError = require("../helpers/MongooseError");

const dashboardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    backgroundURL: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true, strictPopulate: false }
);

dashboardSchema.post("save", MongooseError);

const Dashboard = model("dashboard", dashboardSchema);

module.exports = Dashboard;
