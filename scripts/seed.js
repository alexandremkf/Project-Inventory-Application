const pool = require("../db/pool");

async function seedDatabase() {
  try {
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

// permite rodar localmente também
if (require.main === module) {
  seedDatabase().then(() => process.exit());
}