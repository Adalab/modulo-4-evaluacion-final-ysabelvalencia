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

  //Enviar una respuesta
  res.json({
    info: { count: numOfSpells }, // número de elementos
    spellsList: spellsList, // listado
  });
});
