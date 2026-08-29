const agregar = document.querySelector('#btn-registro');
const formularios = document.querySelector('.formularios');
agregar.addEventListener('click', ()=>{
    formularios.classList.remove('d-none');
})

function eliminar (){
    formularios.classList.add('d-none');
}

const radios = document.querySelectorAll('input[name="opcion"]');
let docentes = document.querySelector('#docentes');
let estudiantes = document.querySelector('#estudiantes');
let auxiliares = document.querySelector('#auxiliares');
const aplicarDocente = document.querySelector('#btn-aplicar-docente');
const aplicarAlumno = document.querySelector('#btn-aplicar-alumno');
const aplicarAuxiliar = document.querySelector('#btn-aplicar-auxiliar');

radios.forEach(radio =>{
    radio.addEventListener('change', (evento)=>{
        
        const id = evento.target.id;

        document.getElementById('form-'+id).classList.remove('d-none');

        radios.forEach(r =>{
            r.disabled = true;
        })
        
    })
})

function finalizarRegistro (evento) {
    
    document.getElementById(evento).classList.add('d-none');

    radios.forEach(r => {
        r.disabled = false;
        r.checked = false
    })
}

aplicarDocente.addEventListener('click', (evento)=> {
    evento.preventDefault();
    console.log(validarDocente());
    if(validarDocente()) {
        document.querySelector('#nombre-docente').value = "";
        document.querySelector('#rut-docente').value = "";
        document.querySelector('#fecha-contrato-docente').value = "";
        document.querySelector('#correo-docente').value = "";
        document.querySelector('#telefono-docente').value = "";
        const nuevo = parseInt(docentes.textContent) + 1;
        docentes.textContent = nuevo;
        alert("Docente agregado con exito!")
        finalizarRegistro('form-docente');
        eliminar();
    } else {
        alert("Datos no validos, intente nuevamente")
    }
})

aplicarAlumno.addEventListener('click', (evento)=> {
    evento.preventDefault();
    if(validarEstudiante()) {
        document.querySelector('#nombre-alumno').value = "";
        document.querySelector('#rut-alumno').value = "";
        document.querySelector('#apoderado').value = "";
        document.querySelector('#telefono-apoderado').value = "";
        const nuevo = parseInt(estudiantes.textContent) + 1;
        estudiantes.textContent = nuevo;
        alert("Estudiante agregado con exito!")
        finalizarRegistro('form-estudiante');    
        eliminar();
    } else {
        alert("Datos no validos, intente nuevamente")
    }
    
})

aplicarAuxiliar.addEventListener('click', (evento)=> {
    evento.preventDefault();
    if(validarAuxiliar()) {
        document.querySelector('#nombre-auxiliar').value = "";
        document.querySelector('#rut-auxiliar').value = "";
        document.querySelector('#fecha-contrato-aux').value = "";
        document.querySelector('#correo-auxiliar').value = "";
        document.querySelector('#telefono-auxiliar').value = "";
        const nuevo = parseInt(auxiliares.textContent) + 1;
        auxiliares.textContent = nuevo;
        alert("Auxiliar agregado con exito!")
        finalizarRegistro('form-auxiliar');
        eliminar();
    } else {
        alert("Datos no validos, intente nuevamente")
    }
    
})

//Validacion de formularios

//Docente

function validarDocente() {
    const nombre_docente = document.querySelector('#nombre-docente').value;
    const rut_docente = document.querySelector('#rut-docente').value;
    const fecha_contrato = document.querySelector('#fecha-contrato-docente').value;
    const correo_docente = document.querySelector('#correo-docente').value;
    const telefono_docente = document.querySelector('#telefono-docente').value;
    if(nombre_docente.length > 3 && rut_docente.length >= 8 && fecha_contrato != "" && correo_docente.includes('.')
        && correo_docente.includes('@') && telefono_docente.length > 8) {
        return true;
    } else {
        return false;
    }
}

//Estudiante

const nombre_alumno = document.querySelector('#nombre-alumno').value;
const rut_alumno = document.querySelector('#rut-alumno').value;
const apoderado = document.querySelector('#apoderado').value;
const telefono_apoderado = document.querySelector('#telefono-apoderado').value;

function validarEstudiante() {
    if(nombre_alumno.length > 3 && rut_alumno.length >= 8 && apoderado.length > 3 && telefono_apoderado.length > 8) {
        return true;
    } else {
        return false;
    }
}

//Auxiliar

const nombre_auxiliar = document.querySelector('#nombre-auxiliar').value;
const rut_auxiliar = document.querySelector('#rut-auxiliar').value;
const fecha_contrato_auxiliar = document.querySelector('#fecha-contrato-aux').value;
const correo_auxiliar = document.querySelector('#correo-auxiliar').value;
const telefono_auxiliar = document.querySelector('#telefono-auxiliar').value;

function validarAuxiliar() {
    if(nombre_auxiliar.length > 3 && rut_auxiliar.length >= 8 && fecha_contrato_auxiliar != "" && correo_auxiliar.includes('.') && correo_auxiliar.includes('@') && telefono_auxiliar.length > 8) {
        return true;
    } else {
        return false;   
    }
}

//Boton reset

const resetDocente = document.querySelector('#btn-reset-docente');
const resetAlumno = document.querySelector('#btn-reset-alumno');
const resetAuxiliar = document.querySelector('#btn-reset-auxiliar');

resetDocente.addEventListener('click', ()=> {
    document.querySelector('#nombre-docente').value = "";
    document.querySelector('#rut-docente').value = "";
    document.querySelector('#fecha-contrato-docente').value = "";
    document.querySelector('#correo-docente').value = "";
    document.querySelector('#telefono-docente').value = "";
})

resetAlumno.addEventListener('click', ()=> {
    document.querySelector('#nombre-alumno').value = "";
    document.querySelector('#rut-alumno').value = "";
    document.querySelector('#apoderado').value = "";
    document.querySelector('#telefono-apoderado').value = "";
})

resetAuxiliar.addEventListener('click', ()=> {
    document.querySelector('#nombre-auxiliar').value = "";
    document.querySelector('#rut-auxiliar').value = "";
    document.querySelector('#fecha-contrato-aux').value = "";
    document.querySelector('#correo-auxiliar').value = "";
    document.querySelector('#telefono-auxiliar').value = "";
})