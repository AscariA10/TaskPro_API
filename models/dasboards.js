const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const boardSchema = new Schema(
  {
    title: {
      type: String,
    },
    boardIcon: {
      type: String,
      default: "icon",
    },
    boardBackground: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.set("save", handleMongooseError);

const Board = model("board", boardSchema);

module.exports = {
  Board,
  boardSchema,
};
