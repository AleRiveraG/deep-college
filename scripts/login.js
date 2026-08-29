const iniciar = document.querySelector('#btn-iniciar');

iniciar.addEventListener('click', (evento)=>{
    evento.preventDefault();
    const correo = document.querySelector('#correo').value;
    const contrasena = document.querySelector('#contrasena').value;

    if(!validarCorreo(correo)) {
        alert("Correo ingresado no valido, compruebe los datos");
        return;
    }
    
    if(!validarContrasena(contrasena)) {
        alert("Contraseña no valida, ingrese nuevamente");
        return;
    }
    
    let rol = buscarRol(correo);
    
    if(rol === 'directiva') {
        alert('Inicio de sesión exitoso!')
        window.location.href = 'directiva-pagina-principal.html';
    } else if (rol === 'docente') {
        alert('Inicio de sesión exitoso!')
        window.location.href = 'docente-pagina-principal.html';
    } else if(rol === 'estudiante') {
        alert('Inicio de sesión exitoso!')
        window.location.href = 'estudiante-pagina-principal.html';
    } else {
        alert('Correo no valido');
    }
})

//Validar correo

function validarCorreo(correo) {
    if(correo.trim() == "" || !correo.includes('@') || !correo.includes('.')) {
        return false;
    } else {
        return true;
    }
}

//Validar contraseña

function validarContrasena(contrasena) {
    if(contrasena.trim() == "" || contrasena.trim().length < 8) {
        return false;
    } else {
        return true;
    }
}

//Buscar rol

function buscarRol(correo) {
    let dominio = correo.split('@')[1];
    let rol = dominio.split('.')[0]
    return rol;
}