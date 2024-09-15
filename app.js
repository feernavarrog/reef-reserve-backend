const express = require('express');
const cors = require('cors');
const path = require('path');
const database = require('./services/database');
const usuarioRoutes = require('./usuario/usuarioRoutes');
const habitacionRoutes = require('./habitacion/habitacionRoutes');  

const app = express();

// Configuraciones
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Servir archivos estáticos desde 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Rutas de la aplicación
app.use('/usuarios', usuarioRoutes);
app.use('/habitaciones', habitacionRoutes);

// Ruta PANEL DE ADMINISTRADOR PARA TESTEAR
app.get('/', (req, res) => {
  res.render('panel-admin');
});

// Ruta de testeo de la plantilla
app.get('/home', (req, res) => {res.render('home');});
app.get('/registro_usuario', (req, res) => {res.render('registro_usuario');});
app.get('/panel-admin', (req, res) => { res.render('panel-admin'); });
app.get('/usuario', (req, res) => { res.render('usuario'); });



// Ruta Login
app.get('/login', (req, res) => {res.render('login');});

// Inicializar la base de datos
database.initialize();

// Manejador de señales para cierre adecuado de la base de datos
process.on('SIGINT', () => {
  database.close().then(() => {
    console.log('Base de datos cerrada correctamente');
    process.exit(0);
  }).catch(err => {
    console.error('Error al cerrar la base de datos:', err);
    process.exit(1);
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Backend is running on http://localhost:3000');
});