const { Schema, model } = require("mongoose");

const MongooseError = require("../helpers/MongooseError");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "dashboard",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", MongooseError);

const Column = model("column", columnSchema);

module.exports = Column;
