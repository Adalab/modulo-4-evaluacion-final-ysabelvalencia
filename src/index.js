const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const generateToken = (payload) => {
  const token = jwt.sign(payload, 'secreto', { expiresIn: '12h' });
  return token;
};

// Middleware de autenticación JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (req.path === '/profile') {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de autenticación no proporcionado',
      });
    }

    jwt.verify(token, 'secreto', (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token de autenticación inválido',
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
//validaciones: no dejar añadir más con el mismo nombre

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

//3.ACTUALIZAR UN SPELL YA EXISTENTE

app.put('/spells/:id', async (req, res) => {
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

  const idSpell = req.params.id;

  let sql =
    'UPDATE spells SET slug=?, category=?, creator=?, effect=?, hand=?, image=?, incantation=?, light=?, name=?, wiki=? WHERE idSpell=?';

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
    idSpell,
  ]);

  res.json({
    success: true,
    message: 'Actualizado correctamente',
  });
});

//4. ELIMINAR UN SPELL DE LA TABLA

app.delete('/spells/:id', async (req, res) => {
  const idSpell = req.params.id;

  let sql = 'DELETE FROM spells WHERE idSpell=?';

  const conn = await getConnection();

  //Ejecutar esa consulta
  const [spellList] = await conn.query(sql, [idSpell]);

  res.json({
    success: true,
    message: 'Eliminado correctamente',
  });
});

//5. BONUS: REGISTRO DE USUARIOS

app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error(
        'Se requiere un correo electrónico, una contraseña y un nombre.'
      );
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
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//5. BONUS: LOGIN DE USUARIOS

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let sql = 'SELECT * FROM users WHERE email =?';

  const conn = await getConnection();
  const [user] = await conn.query(sql, [email]);

  if (user.length === 0) {
    return res.status(401).json({
      success: false,
      message: 'Credenciales incorrectas',
    });
  }

  const isValidPassword = await bcrypt.compare(password, user[0].password);

  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      message: 'Credenciales incorrectas',
    });
  }

  const tokenPayload = { idUser: user[0].idUser, email: user[0].email };
  const token = generateToken(tokenPayload);

  res.json({
    success: true,
    token: token,
  });
});

//6.BONUS IMPLEMENTAR UN MIDDLEWARE DE AUTENTICACIÓN (definido en L.29).Se utiliza en este endpoint para que solo tengan acceso los usuarios logados correctamente.

app.get('/profile', authenticateJWT, async (req, res) => {
  const idUser = req.user.idUser;
  const email = req.user.email;

  const conn = await getConnection();
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
});
