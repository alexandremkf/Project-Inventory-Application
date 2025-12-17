const pool = require("../db/pool");

exports.testDb = async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Banco conectado! Hora do banco: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao conectar no banco");
  }
};