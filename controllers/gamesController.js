const pool = require("../db/pool");

// FORM
exports.createGameForm = async (req, res) => {
  const categories = await pool.query("SELECT * FROM categories ORDER BY name");

  res.render("games/new", { categories: categories.rows });
};

// CREATE
exports.createGame = async (req, res) => {
  const { title, description, price, stock, category_id } = req.body;

  await pool.query(
    `INSERT INTO games (title, description, price, stock, category_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [title, description, price, stock, category_id]
  );

  res.redirect(`/categories/${category_id}`);
};

// READ
exports.getGameById = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `SELECT games.*, categories.name AS category_name
     FROM games
     JOIN categories ON games.category_id = categories.id
     WHERE games.id = $1`,
    [id]
  );

  res.render("games/show", { game: result.rows[0] });
};

// FORM EDIT
exports.editGameForm = async (req, res) => {
  const { id } = req.params;

  const gameResult = await pool.query(
    "SELECT * FROM games WHERE id = $1",
    [id]
  );

  const categoriesResult = await pool.query(
    "SELECT * FROM categories ORDER BY name"
  );

  res.render("games/edit", {
    game: gameResult.rows[0],
    categories: categoriesResult.rows,
  });
};

// UPDATE
exports.updateGame = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, stock, category_id } = req.body;

  await pool.query(
    `UPDATE games
     SET title = $1, description = $2, price = $3, stock = $4, category_id = $5
     WHERE id = $6`,
    [title, description, price, stock, category_id, id]
  );

  res.redirect(`/games/${id}`);
};

// DELETE
exports.deleteGame = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT category_id FROM games WHERE id = $1",
    [id]
  );

  const categoryId = result.rows[0].category_id;

  await pool.query("DELETE FROM games WHERE id = $1", [id]);

  res.redirect(`/categories/${categoryId}`);
};