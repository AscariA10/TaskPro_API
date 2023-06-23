const { Schema, model } = require('mongoose');

const MongooseError = require('../helpers/MongooseError');

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['no-priority', 'low', 'medium', 'high'],
      default: 'no-priority',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'column',
      required: true,
    },
    deadline: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post('save', MongooseError);

const Card = model('user', cardSchema);

module.exports = Card;
