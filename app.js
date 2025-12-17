const express = require("express");
const path = require("path");
const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// home (temporário)
app.get("/", (req, res) => {
  res.send("Inventory App - Loja de Games");
});

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});