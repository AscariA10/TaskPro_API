const { Schema, model } = require('mongoose');

const MongooseError = require('../helpers/MongooseError');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: { type: String },
    theme: {
      type: String,
      enum: ['light', 'dark', 'violet'],
      default: 'violet',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post('save', MongooseError);

const User = model('user', userSchema);

module.exports = User;
