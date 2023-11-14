const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_ysafvr8',
    password: 'a2ARTaqg69*zSA8',
    database: 'freedb_module4_exam',
  });

  connection.connect();
  return connection;
}

const port = 4500;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

//1.ENDPOINT PARA COGER TODA LA LISTA DE SPELLS

app.get('/spells', async (req, res) => {
  let query = 'SELECT * FROM spells';

  const conn = await getConnection();

  const [spellsList] = await conn.query(query);

  const numOfSpells = spellsList.length;

  res.json({
    info: { count: numOfSpells },
    spellsList: spellsList,
  });
});

//2.ENDPOINT CREAR NUEVA ENTRADA EN LA BD
app.post('/spells', async (req, res) => {
  const dataSpell = req.body; //objeto
  const {
    slug,
    category,
    creator,
    effect,
    hand,
    image,
    incantation,
    light,
    name,
    wiki,
  } = dataSpell;

  let sql =
    'INSERT INTO spells (slug, category, creator, effect, hand, image,incantation, light, name,wiki) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

  try {
    const conn = await getConnection();

    const [spellsList] = await conn.query(sql, [
      slug,
      category,
      creator,
      effect,
      hand,
      image,
      incantation,
      light,
      name,
      wiki,
    ]);

    // Valida si la receta ya existe, o está duplicada
    //validar si se ha insertado o no
    if (spellsList.affectedRows === 0) {
      res.json({
        success: false,
        message: 'No se ha podido insertar',
      });
      return;
    }

    res.json({
      success: true,
      id: spellsList.insertId, // id que generó MySQL para la nueva fila
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Ha ocurrido un error${error}`,
    });
  }
});
