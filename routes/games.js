const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

// FORM
router.get("/new", gamesController.createGameForm);

// CREATE
router.post("/new", gamesController.createGame);

// READ - jogo individual
router.get("/:id", gamesController.getGameById);

module.exports = router;