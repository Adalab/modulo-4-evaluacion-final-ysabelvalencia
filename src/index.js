const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//BONUS, uso de dotenv

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

async function getConnection() {
  const connection = await mysql.createConnection(dbConfig);
  connection.connect();
  return connection;
}

const generateToken = (payload) => {
  const token = jwt.sign(payload, 'secreto', { expiresIn: '12h' });
  return token;
};

//BONUS, establecer middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (req.path === '/profile') {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token not provided',
      });
    }

    jwt.verify(token, 'secreto', (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid authentication token',
        });
      }

      req.user = user;

      next();
    });
  } else {
    next();
  }
};

app.use(authenticateJWT);

const port = 4500;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

//1.ENDPOINT PARA COGER TODOS LOS HECHIZOS

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

//2.ENDPOINT CREAR UN NUEVO HECHIZO

app.post('/spells', async (req, res) => {
  let conn;
  try {
    const dataSpell = req.body;
    const {
      name,
      category,
      effect,
      hand_movement,
      image,
      incantation,
      light,
      wiki,
    } = dataSpell;

    if (
      !name ||
      !category ||
      !effect ||
      !light ||
      name.trim() === '' ||
      category.trim() === '' ||
      effect.trim() === '' ||
      light.trim() === ''
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Upps! Spells not added. Name, category, effect, and light are required fields.',
      });
    }

    let sql =
      'INSERT INTO spells (name, category, effect, hand_movement, image,incantation, light, wiki) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

    conn = await getConnection();

    const [spellsList] = await conn.query(sql, [
      name,
      category,
      effect,
      hand_movement,
      image,
      incantation,
      light,
      wiki,
    ]);

    if (spellsList.affectedRows === 0) {
      res.json({
        success: false,
        message: 'It was not possible to add the spell',
      });
      return;
    }

    res.json({
      success: true,
      id: spellsList.insertId,
    });
  } catch (error) {
    // Captura el error de restricción única
    if (error.code === 'ER_DUP_ENTRY') {
      res.json({
        success: false,
        message:
          'It was not possible to add the spell. The name is already in use.',
      });
    } else {
      res.json({
        success: false,
        message: `An error has occurred while adding the spell: ${error}`,
      });
    }
  } finally {
    if (conn) {
      conn.end();
    }
  }
});

//3.ACTUALIZAR UN HECHIZO YA EXISTENTE

app.put('/spells/:id', async (req, res) => {
  const dataSpell = req.body; //objeto
  const {
    name,
    category,
    effect,
    hand_movement,
    image,
    incantation,
    light,
    wiki,
  } = dataSpell;

  const idSpell = req.params.id;

  if (
    !name ||
    !category ||
    !effect ||
    !light ||
    name.trim() === '' ||
    category.trim() === '' ||
    effect.trim() === '' ||
    light.trim() === ''
  ) {
    return res.status(400).json({
      success: false,
      message:
        'Upps! It was not possible to update the spell. Name, category, effect, and light are required fields.',
    });
  }

  if (isNaN(parseInt(idSpell))) {
    res.json({
      success: false,
      error: 'To find your spell the id must be a number',
    });
    return;
  }

  let sql =
    'UPDATE spells SET name=?, category=?, effect=?, hand_movement=?, image=?, incantation=?, light=?, wiki=? WHERE idSpell=?;';

  const conn = await getConnection();

  try {
    const [spellsList] = await conn.query(sql, [
      name,
      category,
      effect,
      hand_movement,
      image,
      incantation,
      light,
      wiki,
      idSpell,
    ]);

    if (spellsList.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Spell not found.' });
    }

    res.json({
      success: true,
      message: 'Spell updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error has occurred while updating the spell.',
    });
  } finally {
    conn.end();
  }
});

//EXTRA, MOSTRAR UN HECHIZO

app.get('/spells/:id', async (req, res) => {
  const idSpell = req.params.id;
  let conn;

  try {
    if (isNaN(parseInt(idSpell))) {
      res.json({
        success: false,
        error: 'To find your spell the id must be a number',
      });
      return;
    }

    let query = 'SELECT * FROM spells WHERE idSpell =?';

    conn = await getConnection();

    const [spellsList] = await conn.query(query, [idSpell]);
    const numOfSpells = spellsList.length;

    if (numOfSpells === 0) {
      res.json({
        success: false,
        message: 'The spell you are looking for does not exist.',
      });
      return;
    }
    res.json({
      spellsList: spellsList[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the spell.',
    });
  } finally {
    if (conn) {
      conn.end();
    }
  }
});

//4. ELIMINAR UN HECHIZO

app.delete('/spells/:id', async (req, res) => {
  const idSpell = req.params.id;

  if (!idSpell || isNaN(idSpell)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid spell ID.' });
  }

  let sql = 'DELETE FROM spells WHERE idSpell=?';

  const conn = await getConnection();

  try {
    const [spellsList] = await conn.query(sql, [idSpell]);

    if (spellsList.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Spell not found.' });
    }

    res.json({
      success: true,
      message: 'Spell deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    conn.end();
  }
});

//5. BONUS: REGISTRO DE USUARIOS

app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error('To register an email, password, and name are required.');
    }
    const passwordHashed = await bcrypt.hash(password, 10);

    const sql =
      'INSERT INTO users(`email`, `name`, `password`) VALUES (?, ?, ?)';

    const conn = await getConnection();
    const [results] = await conn.query(sql, [email, name, passwordHashed]);

    const token = generateToken({ email, name });

    res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'An error has occurred while registering the user.',
    });
  }
});

//5. BONUS: LOGIN DE USUARIOS

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let sql = 'SELECT * FROM users WHERE email =?';

  const conn = await getConnection();

  try {
    const [user] = await conn.query(sql, [email]);

    if (user.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect credentials',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user[0].password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect login credentials',
      });
    }

    const tokenPayload = { idUser: user[0].idUser, email: user[0].email };
    const token = generateToken(tokenPayload);

    res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error has occurred while attempting to log in.',
    });
  } finally {
    conn.end();
  }
});

//6.BONUS. MIDDLEWARE DE AUTENTICACIÓN (definido en L.29)
//Se utiliza en este endpoint para que solo tengan acceso los usuarios logados correctamente.

app.get('/profile', authenticateJWT, async (req, res) => {
  const idUser = req.user.idUser;
  const email = req.user.email;

  const conn = await getConnection();

  try {
    const [userData] = await conn.query('SELECT * FROM users WHERE idUser=?', [
      idUser,
    ]);

    res.json({
      success: true,
      profile: {
        email: email,
        additionalData: userData,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error has occurred while fetching user profile data.',
    });
  } finally {
    conn.end();
  }
});
