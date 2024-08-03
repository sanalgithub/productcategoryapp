const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", categoryController.createCategory);
router.get("/:id?", categoryController.getCategories);
router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
