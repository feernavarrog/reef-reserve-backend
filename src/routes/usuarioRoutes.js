// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioService = require('../models/usuario');

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const usuario = req.body;
        const result = await usuarioService.crearUsuario(usuario);
        res.status(201).send('Usuario creado con éxito');
    } catch (err) {
        console.error("Error al crear el usuario:", err);
        res.status(500).send(err.message);
    }
});

// Obtener todos los usuarios
router.get('/obtenerUsuarios', async (req, res) => {
    try {
        const result = await usuarioService.obtenerUsuarios();
        if (result.rows.length === 0) {
            res.status(404).send('No existen usuarios registrados');
        } else {
            res.status(200).json(result.rows);  // Devuelve todos los usuarios
        }
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).send(err.message);
    }
});

// Obtener un usuario por ID
router.post('/obtenerUsuario', async (req, res) => {
    const { id_usuario } = req.body;

    try {
        const result = await usuarioService.obtenerUsuario(id_usuario);
        if (result.rows.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error("Error al obtener el usuario:", err);
        res.status(500).send(err.message);
    }
});

// Obtener un usuario por correo
router.post('/obtenerUsuarioPorCorreo', async (req, res) => {
    const { correo_usuario } = req.body;

    try {
        const result = await usuarioService.obtenerUsuarioPorCorreo(correo_usuario);
        if (result.rows.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error("Error al obtener el usuario:", err);
        res.status(500).send(err.message);
    }
});

// Actualizar un usuario
router.post('/actualizarUsuario', async (req, res) => {
    const { id_usuario, correo_electronico, clave_usuario, nombre_usuario, apellido_usuario, id_tipo_usuario } = req.body;

    try {
        const usuario = {
            correo_electronico,
            clave_usuario,
            nombre_usuario,
            apellido_usuario,
            id_tipo_usuario
        };

        const result = await usuarioService.actualizarUsuario(id_usuario, usuario);
        if (result.rowsAffected === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.status(200).send('Usuario actualizado con éxito');
        }
    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
        res.status(500).send(err.message);
    }
});

// Eliminar un usuario
router.post('/eliminarUsuario', async (req, res) => {
    const { id_usuario } = req.body;

    try {
        const result = await usuarioService.eliminarUsuario(id_usuario);
        if (result.rowsAffected === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.status(200).send('Usuario eliminado con éxito');
        }
    } catch (err) {
        console.error("Error al eliminar el usuario:", err);
        res.status(500).send(err.message);
    }
});

// Exportar el router
module.exports = router;
