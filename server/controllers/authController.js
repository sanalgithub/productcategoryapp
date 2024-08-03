const constants = require("../constants/constants");
const User = require("../models/userModel");
const createError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError(constants.USER_ALREADY_EXISTS, 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      status: constants.SUCCESS,
      message: constants.USER_CREATED,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new createError(constants.USER_NOT_FOUND, 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError(constants.PASSWORD_NOT_MATCHING, 404));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, roles: user.roles },
      process.env.JWT_TOKEN,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );

    res.status(200).json({
      status: constants.SUCCESS,
      token,
      message: constants.LOGGED_IN_SUCCESSFULLY,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
