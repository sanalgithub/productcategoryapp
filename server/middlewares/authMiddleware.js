const jwt = require("jsonwebtoken");
const createError = require("../utils/appError");
const constants = require("../constants/constants");

const authMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(new createError(constants.YOU_ARE_NOT_LOGGED_IN, 401));
  }

  jwt.verify(token, "secret123", (err, decoded) => {
    if (err) {
      return next(new createError(constants.INVALID_TOKEN, 401));
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
