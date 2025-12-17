const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const categoriesRoutes = require("./routes/categories");
const gamesRoutes = require("./routes/games");
const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.use("/categories", categoriesRoutes);
app.use("/games", gamesRoutes);

// home (temporário)
app.get("/", (req, res) => {
  res.send("Inventory App - Loja de Games");
});

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});