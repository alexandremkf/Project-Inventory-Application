const pool = require("../db/pool");

async function seedDatabase() {
  try {
    console.log("🛠️ Garantindo estrutura do banco...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        stock INTEGER NOT NULL,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
      );
    `);

    console.log("🌱 Verificando banco...");
    const { rows } = await pool.query("SELECT COUNT(*) FROM categories");

    if (Number(rows[0].count) > 0) {
      console.log("✅ Banco já populado, seed ignorado.");
      return;
    }

    console.log("📦 Inserindo categorias...");
    const categoriesResult = await pool.query(`
      INSERT INTO categories (name, description)
      VALUES
        ('RPG', 'Jogos de RPG'),
        ('Ação', 'Jogos de ação'),
        ('Esporte', 'Jogos esportivos'),
        ('Indie', 'Jogos independentes')
      RETURNING id
    `);

    const [rpg, action, sport, indie] = categoriesResult.rows;

    console.log("🎮 Inserindo jogos...");
    await pool.query(
      `INSERT INTO games (title, description, price, stock, category_id)
       VALUES
        ('The Witcher 3', 'RPG de mundo aberto', 99.90, 10, $1),
        ('Elden Ring', 'RPG de ação desafiador', 249.90, 5, $1),
        ('God of War', 'Ação e narrativa', 199.90, 7, $2),
        ('FIFA 24', 'Futebol', 299.90, 15, $3),
        ('Hollow Knight', 'Metroidvania indie', 59.90, 20, $4)
      `,
      [rpg.id, action.id, sport.id, indie.id]
    );

    console.log("✅ Seed executado com sucesso!");
  } catch (err) {
    console.error("❌ Erro no seed:", err);
  }
}

module.exports = seedDatabase;