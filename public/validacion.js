
function validar(correo, clave) {

    if (correo === '' || clave === '') {
        alert('Los campos no pueden estar vacios');
        return false;
    }

    return true;
}