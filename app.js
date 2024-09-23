const express = require('express');
const cors = require('cors');
const path = require('path');
const database = require('./src/services/database');
const userRoutes = require('./src/routes/userRoutes');
const roomRoutes = require('./src/routes/roomRoutes');

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

//! INTENTAR SOLO SERVIR PUBLIC
// Servir archivos estáticos desde 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));



//! Nuevas rutas ( en ingles ) definidas finales
app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.get('/', (req, res) => {res.render('viewLogin');});
app.get('/newLogin', (req, res) => {res.render('viewLogin');});
app.get('/newRegister', (req, res) => {res.render('viewRegister');});
app.get('/newHome', (req, res) => {res.render('viewHome');});
app.get('/adminPannel', (req, res) => {res.render('viewAdminPannel');});
app.get('/adminUserList', (req, res) => {res.render('viewAdminUserList');});
app.get('/adminRoomList', (req, res) => {res.render('viewAdminRoomList');});
app.get('/adminUserForm', (req, res) => {res.render('viewAdminCreateEditUser');});
app.get('/adminRoomForm', (req, res) => {res.render('viewAdminCreateEditRoom');});
app.get('/clientCatalog', (req, res) => {res.render('viewClientCatalog');});
app.get('/roomSpecs', (req, res) => {res.render('viewClientRoomSpecs');});


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



// Rutas de la aplicación ( antiguas )
//app.use('/usuarios', usuarioRoutes);
//app.use('/habitaciones', habitacionRoutes);
/*const usuarioRoutes = require('./src/routes/usuarioRoutes');
const habitacionRoutes = require('./src/routes/habitacionRoutes');*/
/*
//! Rutas ya definidas finales
// Ruta de inicio

// Rutas administracion de usuarios
app.get('/admin-readUser', (req, res) => { res.render('admin-readUser'); });
app.get('/admin-createEditUser', (req, res) => { res.render('admin-createEditUser'); });

// Rutas administracion de habitaciones
app.get('/admin-readRoom', (req, res) => { res.render('admin-readRoom'); });
app.get('/admin-createEditRoom', (req, res) => { res.render('admin-createEditRoom'); });

// Ruta visualizar habitacion
app.get('/client-catalog', (req, res) => { res.render('client-catalog'); });
app.get('/client-viewRoom', (req, res) => { res.render('client-viewRoom'); });

//! Ruta de testeo de la plantilla
app.get('/home', (req, res) => {res.render('home');});
app.get('/register', (req, res) => {res.render('register');});

app.get('/panel-admin', (req, res) => { res.render('panel-admin'); });

app.get('/carrousel', (req, res) => { res.render('carrousel'); });

app.get('/admin-updateUser', (req, res) => { res.render('admin-updateUser'); });

// Ruta Login
app.get('/login', (req, res) => {res.render('login');});
*/
