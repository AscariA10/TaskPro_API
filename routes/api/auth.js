const path = require('path');
const express = require('express');

const router = express.Router();

const authController = require('../../controllers/auth');

const auth = require('../../middlewares/auth');

module.exports = router;
