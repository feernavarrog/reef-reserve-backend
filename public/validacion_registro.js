//FUNCION QUE VALIDA QUE NO SEAN NULOS

function validarRegistro(nombre, apellido, correo, clave) {
    if (nombre === '' || apellido === '' || correo === '' || clave === '') {
        alert('Todos los campos son obligatorios');
        return false;
    }

    return true;
}

//FUNCION QUE VERIFICA validarRegistro Y LLAMA A createUser SI ES EXITOSA
function validarYCrearUsuario() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;

    if (validarRegistro(nombre, apellido, correo, clave)) {
        createUser(); // Llama a la función createUser si la validación es exitosa
    }
}