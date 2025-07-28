const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const app = express();
const PORT = 3000;

// Configuración de la aplicación
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Cambiar a true en producción con HTTPS
}));

// Middleware para verificar autenticación
const requireAuth = (req, res, next) => {
  if (req.session.loggedin) return next();
  res.redirect('/');
};

// Rutas
app.get('/', (req, res) => {
  if (req.session.loggedin) {
    return res.redirect('/home');
  }
  res.render('login', { error: req.query.error });
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  
  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect('/?error=2');
      }
      
      if (user) {
        req.session.loggedin = true;
        req.session.username = username;
        return res.redirect('/home');
      } else {
        return res.redirect('/?error=1');
      }
    }
  );
});

app.get('/home', requireAuth, (req, res) => {
  res.render('home', { username: req.session.username });
});

app.get('/solicitudes', requireAuth, (req, res) => {
  res.render('solicitudes', { username: req.session.username });
});

app.get('/gestionsolicitudes', requireAuth, (req, res) => {
  res.render('gestionsolicitudes', { username: req.session.username });
});

app.get('/usuarios', requireAuth, (req, res) => {
  db.all('SELECT id, username, password FROM users', (err, users) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).send('Error al obtener los usuarios');
    }
    
    res.render('usuarios', {
      users: users,
      username: req.session.username
    });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
