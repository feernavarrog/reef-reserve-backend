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

// Servir archivos estáticos
app.use(express.static('public'));

// Rutas de la aplicación
app.use('/usuarios', usuarioRoutes);
app.use('/habitaciones', habitacionRoutes);

// Ruta principal para el CRUD
app.get('/', (req, res) => {
  res.render('crud');
});

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
