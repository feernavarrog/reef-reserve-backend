
// Funciones para realizar operaciones CRUD sobre la tabla habitaciones

// Crear una habitación
async function createRoom() {
    const room = {
        numero_hab: document.getElementById('numero_hab').value,
        info_hab: document.getElementById('info_hab').value,
        equipamiento_hab: document.getElementById('equipamiento_hab').value,
        valor_diario_hab: parseFloat(document.getElementById('valor_diario_hab').value),
        id_ubicacion: parseInt(document.getElementById('id_ubicacion').value, 10),
        id_estado: parseInt(document.getElementById('id_estado').value, 10),
        id_categoria: parseInt(document.getElementById('id_categoria').value, 10)
    };

    const response = await fetch('http://localhost:3000/habitaciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    alert(await response.text());
}

// Obtener una habitación por ID
async function getRoom() {
    const roomId = document.getElementById('roomId').value;

    const requestData = {
        id_habitacion: roomId
    };

    const response = await fetch('http://localhost:3000/habitaciones/obtenerHabitacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    } else {
        document.getElementById('result').innerText = 'Error al obtener habitación';
    }
}

// Actualizar una habitación
async function updateRoom() {
    const roomId = document.getElementById('roomId').value;
    const room = {
        id_habitacion: roomId,
        numero_hab: document.getElementById('numero_hab').value,
        info_hab: document.getElementById('info_hab').value,
        equipamiento_hab: document.getElementById('equipamiento_hab').value,
        valor_diario_hab: parseFloat(document.getElementById('valor_diario_hab').value),
        id_ubicacion: parseInt(document.getElementById('id_ubicacion').value, 10),
        id_estado: parseInt(document.getElementById('id_estado').value, 10),
        id_categoria: parseInt(document.getElementById('id_categoria').value, 10)
    };

    const response = await fetch('http://localhost:3000/habitaciones/actualizarHabitacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    alert(await response.text());
}

// Eliminar una habitación
async function deleteRoom() {
    const roomId = document.getElementById('roomId').value;

    const requestData = {
        id_habitacion: roomId
    };

    const response = await fetch('http://localhost:3000/habitaciones/eliminarHabitacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    alert(await response.text());
}
