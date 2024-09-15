function validarRegistro(nombre, apellido, correo, clave) {
    if (nombre === '' || apellido === '' || correo === '' || clave === '') {
        alert('Todos los campos son obligatorios');
        return false;
    }

    return true;
}