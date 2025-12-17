const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

// READ
router.get("/", categoriesController.getAllCategories);
router.get("/new", categoriesController.createCategoryForm);
router.get("/:id", categoriesController.getCategoryById);

// CREATE
router.post("/new", categoriesController.createCategory);

// FORM EDIT
router.get("/:id/edit", categoriesController.editCategoryForm);

// UPDATE
router.post("/:id/edit", categoriesController.updateCategory);

module.exports = router;