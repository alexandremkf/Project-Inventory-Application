const pool = require("../db/pool");

// READ - todas as categorias
exports.getAllCategories = async (req, res) => {
  const result = await pool.query("SELECT * FROM categories ORDER BY name");
  res.render("categories/index", { categories: result.rows });
};

// READ - categoria específica
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  const categoryResult = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );

  const gamesResult = await pool.query(
    "SELECT * FROM games WHERE category_id = $1",
    [id]
  );

  res.render("categories/show", {
    category: categoryResult.rows[0],
    games: gamesResult.rows,
  });
};

// FORM
exports.createCategoryForm = (req, res) => {
  res.render("categories/new");
};

// CREATE
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [name, description]
  );

  res.redirect("/categories");
};