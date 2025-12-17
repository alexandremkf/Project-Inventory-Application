const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

// FORM
router.get("/new", gamesController.createGameForm);

// CREATE
router.post("/new", gamesController.createGame);

// READ - jogo individual
router.get("/:id", gamesController.getGameById);

// FORM EDIT
router.get("/:id/edit", gamesController.editGameForm);

// UPDATE
router.post("/:id/edit", gamesController.updateGame);

// DELETE
router.post("/:id/delete", gamesController.deleteGame);

module.exports = router;