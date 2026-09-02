const postular = document.querySelector('#btn-postular');
 
postular.addEventListener('click', (evento)=>{
    evento.preventDefault();
 
    const nombrePostulante = document.querySelector('#nombre-postulante').value;
    const rutPostulante = document.querySelector('#rut-postulante').value;
    const fechaNacimiento = document.querySelector('#fecha-nacimiento').value;
    const curso = document.querySelector('#curso-postula').value;
    const nombreApoderado = document.querySelector('#nombre-apoderado').value;
    const rutApoderado = document.querySelector('#rut-apoderado').value;
    const correoApoderado = document.querySelector('#correo-apoderado').value;
    const telefonoApoderado = document.querySelector('#telefono-apoderado').value;
    const terminos = document.querySelector('#terminos-postulacion').checked;
 
    if(!validarNombre(nombrePostulante)) {
        alert("Nombre del postulante no valido, compruebe los datos ingresados");
        return;
    }
 
    if(!validarRut(rutPostulante)) {
        alert("Rut del postulante no valido, compruebe los datos ingresados");
        return;
    }
 
    if(!validarFecha(fechaNacimiento)) {
        alert("Debe ingresar la fecha de nacimiento del postulante");
        return;
    }
 
    if(!validarCurso(curso)) {
        alert("Debe seleccionar el curso al que postula");
        return;
    }
 
    if(!validarNombre(nombreApoderado)) {
        alert("Nombre del apoderado no valido, compruebe los datos ingresados");
        return;
    }
 
    if(!validarRut(rutApoderado)) {
        alert("Rut del apoderado no valido, compruebe los datos ingresados");
        return;
    }
 
    if(!validarCorreo(correoApoderado)) {
        alert("Correo de contacto no valido, compruebe los datos ingresados");
        return;
    }
 
    if(!validarTelefono(telefonoApoderado)) {
        alert("Teléfono de contacto no valido, compruebe los datos ingresados");
        return;
    }
 
    if(!terminos) {
        alert("Debe autorizar el uso de los datos para continuar con la postulación");
        return;
    }
 
    alert("Postulación enviada con éxito! Nos pondremos en contacto contigo pronto");
    window.location.href = 'index.html';
})
 
//Validar nombre (sirve tanto para postulante como para apoderado)
 
function validarNombre(nombre) {
    if(nombre.trim() == "" || nombre.trim().length < 3 || /\d/.test(nombre)) {
        return false;
    } else {
        return true;
    }
}
 
//Validar rut
 
function validarRut(rut) {
    if(rut.trim() == "" || rut.trim().length < 8 || !rut.includes('-')) {
        return false;
    } else {
        return true;
    }
}
 
//Validar fecha de nacimiento
 
function validarFecha(fecha) {
    if(fecha.trim() == "") {
        return false;
    } else {
        return true;
    }
}
 
//Validar curso seleccionado
 
function validarCurso(curso) {
    if(curso.trim() == "") {
        return false;
    } else {
        return true;
    }
}
 
//Validar correo
 
function validarCorreo(correo) {
    if(correo.trim() == "" || !correo.includes('@') || !correo.includes('.')) {
        return false;
    } else {
        return true;
    }
}
 
//Validar telefono
 
function validarTelefono(telefono) {
    if(telefono.trim() == "" || telefono.trim().length < 8) {
        return false;
    } else {
        return true;
    }
}