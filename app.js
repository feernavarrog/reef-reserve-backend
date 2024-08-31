const express = require('express');
const cors = require('cors');
const database = require('./services/database');
const usuarioRoutes = require('./usuario/usuarioRoutes');
const habitacionRoutes = require('./habitacion/habitacionRoutes');  

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('CRUD'));
app.use('/usuarios', usuarioRoutes);
app.use('/habitaciones', habitacionRoutes);

database.initialize();

process.on('SIGINT', () => {
  database.close().then(() => {
    console.log('Base de datos cerrada correctamente');
    process.exit(0);
  }).catch(err => {
    console.error('Error al cerrar la base de datos:', err);
    process.exit(1);
  });
});

app.listen(3000, () => {
  console.log('Backend is running on http://localhost:3000');
});
