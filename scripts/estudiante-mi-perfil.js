const boton = document.querySelector('#btn-modificar');
const primer_nombre = document.querySelector('#primer-nombre').value;
const segundo_nombre = document.querySelector('#segundo-nombre').value;
const primer_apellido = document.querySelector('#primer-apellido').value;
const segundo_apellido = document.querySelector('#segundo-apellido').value;
const rut = document.querySelector('#rut').value;
const fecha_nacimiento = document.querySelector('#fecha-nacimiento').value;
const inputs = document.querySelectorAll('input');

inputs.forEach(input =>{
    input.disabled = true;
})

boton.addEventListener('click', (evento) =>{
    evento.preventDefault();

    if(inputs[0].disabled === true) {
        inputs.forEach(input =>{
            input.disabled = false;
        });
    } else {

        if(!validarPrimerNombre()){
            alert("Primer nombre no valido, compruebe los datos ingresados");
            return;
        }

        if(!validarSegundoNombre()){
            alert("Segundo nombre no valido, compruebe los datos ingresados");
            return;
        }

        if(!validarPrimerApellido()){
            alert("Primer apellido no valido, compruebe los datos ingresados");
            return;
        }

        if(!validarSegundoApellido()){
            alert("Segundo apellido no valido, compruebe los datos ingresados");
            return;
        }

        if(!validarRut()){
            alert("Rut no valido, compruebe los datos ingresados");
            return;
        }

        if(!validarFechaNacimiento()){
            alert("Fecha ingresada no valida, compruebe los datos ingresados")
            return;
        }

        alert("Datos modificados con exito!")
        
        inputs.forEach(input =>{
            input.disabled = true;
        })

    }
})

//Validar campos

//Primer nombre

function validarPrimerNombre() {
    if(primer_nombre.trim() == "" || primer_nombre.trim().length < 3 || /\d/.test(primer_nombre)) {
        return false;
    } else {
        return true;
    }
}

//Segundo nombre

function validarSegundoNombre() {
    if(segundo_nombre.trim().length < 3 || /\d/.test(segundo_nombre)) {
        return false;
    } else {
        return true;
    }
}

//Primer apellido

function validarPrimerApellido() {
    if(primer_apellido.trim() == "" || primer_apellido.trim().length < 3 || /\d/.test(primer_apellido)) {
        return false;
    } else {
        return true;
    }
}

//Segundo apellido

function validarSegundoApellido() {
    if(segundo_apellido.trim() == "" || segundo_apellido.trim().length < 3 || /\d/.test(segundo_apellido)) {
        return false;
    } else {
        return true;
    }
}

//Fecha de nacimiento

function validarFechaNacimiento() {
    if(fecha_nacimiento == "") {
        return false;
    } else {
        return true;
    }
}

//Rut

function validarRut() {
    if(rut.trim() == "" || rut.trim().length < 8 || !rut.includes("-") || rut.trim.length > 13) {
        return false;
    } else {
        return true;
    }
}