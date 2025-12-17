const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const categoriesRoutes = require("./routes/categories");
const gamesRoutes = require("./routes/games");
const seedDatabase = require("./scripts/seed");

const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/categories", categoriesRoutes);
app.use("/games", gamesRoutes);

// home
app.get("/", (req, res) => {
  res.render("index");
});

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  if (process.env.NODE_ENV === "production") {
    await seedDatabase();
  }
});