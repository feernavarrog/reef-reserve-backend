const express = require('express');
const router = express.Router();
const habitacionService = require('../models/habitacion');

// Crear una nueva habitación
router.post('/', async (req, res) => {
    try {
        const habitacion = req.body;
        const result = await habitacionService.crearHabitacion(habitacion);
        res.status(201).send('Habitación creada con éxito');
    } catch (err) {
        console.error("Error al crear la habitación:", err);
        res.status(500).send(err.message);
    }
});

// Obtener todos los usuarios
router.get('/obtenerHabitaciones', async (req, res) => {
    try {
        const result = await habitacionService.obtenerHabitaciones();
        if (result.rows.length === 0) {
            res.status(404).send('No existen habitaciones registradas');
        } else {
            res.status(200).json(result.rows);  // Devuelve todas las habitaciones
        }
    } catch (err) {
        console.error("Error al obtener habitaciones:", err);
        res.status(500).send(err.message);
    }
});

// Obtener una habitación por ID
router.post('/obtenerHabitacion', async (req, res) => {
    const { id_habitacion } = req.body;

    try {
        const result = await habitacionService.obtenerHabitacion(id_habitacion);
        if (result.rows.length === 0) {
            res.status(404).send('Habitación no encontrada');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error("Error al obtener la habitación:", err);
        res.status(500).send(err.message);
    }
});

// Actualizar una habitación
router.post('/actualizarHabitacion', async (req, res) => {
    try {
        const id_habitacion = req.body.id_habitacion;
        const habitacion = req.body;
        const result = await habitacionService.actualizarHabitacion(id_habitacion, habitacion);
        if (result.rowsAffected === 0) {
            res.status(404).send('Habitación no encontrada');
        } else {
            res.status(200).send('Habitación actualizada con éxito');
        }
    } catch (err) {
        console.error("Error al actualizar la habitación:", err);
        res.status(500).send(err.message);
    }
});

// Eliminar una habitación
router.post('/eliminarHabitacion', async (req, res) => {
    const { id_habitacion } = req.body;

    try {
        const result = await habitacionService.eliminarHabitacion(id_habitacion);
        if (result.rowsAffected === 0) {
            res.status(404).send('Habitación no encontrada');
        } else {
            res.status(200).send('Habitación eliminada con éxito');
        }
    } catch (err) {
        console.error("Error al eliminar la habitación:", err);
        res.status(500).send(err.message);
    }
});

// Exportar las rutas de habitación
module.exports = router;
