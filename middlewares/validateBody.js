const HttpError = require("../helpers/HttpError");

function validateBody(shema) {
  async function func(req, res, next) {
    const { error } = shema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  }
  return func;
}
module.exports = validateBody;
