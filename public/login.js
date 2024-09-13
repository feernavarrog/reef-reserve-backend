// Variables del formulario

async function login() { // esta funcion se ejecuta cuando se presiona el boton iniciar sesion

    // Variables capturadas del formulario de inicio de sesion

    var correo = document.getElementById('correo').value; // captura el correo electronico del usuario ingresado
    var clave = document.getElementById('clave').value; // captura la clave del usuario ingresado

    validar(correo, clave); // llama a la funcion validar con los datos ingresados

    alert(correo + clave); // muestra en pantalla el correo y la clave ingresada
    
    // Variables del usuario que se va a comparar con la base de datos
    const user = {
        correo_electronico: correo,
        clave_usuario: clave
    };

    // Llamada a la funcion validarConBBDD con los datos ingresados
    validarConBBDD(correo, clave);
}

// Funcion para validar los datos ingresados con la base de datos
async function validarConBBDD(correo, clave) {

    const user = {
        correo_electronico: correo,
        clave_usuario: clave
    };

    const response = await fetch('http://localhost:3000/validarUsuarioConBase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    alert(await response.text());

    /*
    const user = {
        correo_electronico: document.getElementById('correo').value,
        clave_usuario: document.getElementById('clave').value,
        nombre_usuario: document.getElementById('nombre').value,
        apellido_usuario: document.getElementById('apellido').value,
        id_tipo_usuario: parseInt(document.getElementById('tipo_usuario').value, 10)
    };

    const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    alert(await response.text());
    */
}
