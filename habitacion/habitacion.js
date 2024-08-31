const database = require('../services/database');

// Crear una nueva habitación
async function crearHabitacion(habitacion) {
    const sql = `INSERT INTO habitacion (numero_hab, info_hab, equipamiento_hab, valor_diario_hab, id_ubicacion, id_estado, id_categoria)
                 VALUES (:numero_hab, :info_hab, :equipamiento_hab, :valor_diario_hab, :id_ubicacion, :id_estado, :id_categoria)`;

    const binds = {
        numero_hab: habitacion.numero_hab,
        info_hab: habitacion.info_hab,
        equipamiento_hab: habitacion.equipamiento_hab,
        valor_diario_hab: habitacion.valor_diario_hab,
        id_ubicacion: habitacion.id_ubicacion,
        id_estado: habitacion.id_estado,
        id_categoria: habitacion.id_categoria
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al crear habitación:", error);
        throw error;
    }
}

// Obtener una habitación por ID
async function obtenerHabitacion(id_habitacion) {
    const sql = `SELECT * FROM habitacion WHERE id_habitacion = :id_habitacion`;
    const binds = { id_habitacion };
    return await database.executeQuery(sql, binds);
}

// Actualizar una habitación
async function actualizarHabitacion(id_habitacion, habitacion) {
    const sql = `UPDATE habitacion
                 SET numero_hab = :numero_hab,
                     info_hab = :info_hab,
                     equipamiento_hab = :equipamiento_hab,
                     valor_diario_hab = :valor_diario_hab,
                     id_ubicacion = :id_ubicacion,
                     id_estado = :id_estado,
                     id_categoria = :id_categoria
                 WHERE id_habitacion = :id_habitacion`;

    const binds = {
        numero_hab: habitacion.numero_hab,
        info_hab: habitacion.info_hab,
        equipamiento_hab: habitacion.equipamiento_hab,
        valor_diario_hab: habitacion.valor_diario_hab,
        id_ubicacion: habitacion.id_ubicacion,
        id_estado: habitacion.id_estado,
        id_categoria: habitacion.id_categoria,
        id_habitacion: id_habitacion
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al actualizar habitación:", error);
        throw error;
    }
}

// Eliminar una habitación
async function eliminarHabitacion(id_habitacion) {
    const sql = `DELETE FROM habitacion WHERE id_habitacion = :id_habitacion`;
    const binds = { id_habitacion };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al eliminar habitación:", error);
        throw error;
    }
}

// Exportar las funciones
module.exports = {
    crearHabitacion,
    obtenerHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
};
