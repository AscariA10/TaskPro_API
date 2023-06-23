const { Schema, model } = require('mongoose');

const MongooseError = require('../helpers/MongooseError');

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'dashboard',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// columnSchema.post('save', MongooseError);

const Column = model('user', columnSchema);

module.exports = Column;
