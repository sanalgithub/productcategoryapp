const createError = require("../utils/appError");
const ProductCategory = require("../models/categoryModel");
const constants = require("../constants/constants");
const category = require("../models/categoryModel");

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const category = await ProductCategory.create({ name, description, price });
    console.log(name, "name");
    res.status(200).json({
      status: constants.SUCCESS,
      message: constants.CATEGORY_CREATED,
      data: { category },
    });
  } catch (error) {
    next(new createError(constants.CREATING_CATEGORY_FAILED, 500));
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const category = await ProductCategory.findById(id);
      if (!category) {
        return next(new createError(constants.CATEGORY_NOT_FOUND, 404));
      }
      res.status(200).json({
        status: constants.SUCCESS,
        data: { category },
      });
    } else {
      const categories = await ProductCategory.find();
      res.status(200).json({
        status: constants.SUCCESS,
        results: categories.length,
        data: { categories },
      });
    }
  } catch (error) {
    next(new createError(constants.FAILED_TO_GET_CATEGORY, 500));
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!category) {
      return next(new createError(category.CATEGORY_NOT_FOUND, 404));
    }
    res.status(200).json({
      status: constants.SUCCESS,
      data: { category },
    });
  } catch (error) {
    next(new createError(category.FAILED_TO_UPDATE_CATEGORY, 500));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(new createError(constants.CATEGORY_NOT_FOUND, 404));
    }

    res.status(204).json({
      status: constants.SUCCESS,
      data: null,
    });
  } catch (error) {
    next(new createError(constants.FAILED_TO_DELETE_CATEGORY, 500));
  }
};
