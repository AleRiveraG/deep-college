const boton = document.querySelector('#btn-modificar');
const nombres = document.querySelector('#nombres').value;
const apellidos = document.querySelector('#apellidos').value;
const rut = document.querySelector('#rut').value;
const telefono = document.querySelector('#telefono').value;
const correo = document.querySelector('#correo').value;
const inputs = document.querySelectorAll('input');
const nivel = document.querySelector('#nivel');

inputs.forEach(input =>{
    input.disabled = true;
    nivel.disabled = true;
});

boton.addEventListener('click', (evento)=>{
    evento.preventDefault();
    boton.textContent = 'Aplicar';

    

    if(inputs[0].disabled === true) {
        inputs.forEach(input =>{
            input.disabled = false;
            nivel.disabled = false;
        });
    } else {

        if(!validarNombre()){
            alert("Nombres no valido, revise los datos");
            return;
        }

        if(!validarApellidos()){
            alert("Apellidos no valido, revise los datos");
            return;
        }

        if(!validarCorreo()){
            alert("Correo no valido, revise los datos");
            return;
        }

        if(!validarTelefono()){
            alert("Telefono no valido, revise los datos");
            return;
        }

        if(!validarRut()){
            alert("Rut no valido, revise los datos");
            return;
        }

        alert("Datos modificados con exito!");

        inputs.forEach(input =>{
            input.disabled = true;
            nivel.disabled = true;
        });
        boton.textContent = 'Modificar';
    }
})

function validarNombre() {
    if(nombres.trim() == "" || nombres.trim().length < 3 || /\d/.test(nombres)) {
        return false;
    } else {
        return true;
    }
}

function validarApellidos() {
    if(apellidos.trim() == "" || apellidos.trim().length < 3 || /\d/.test(apellidos)) {
        return false;
    } else {
        return true;
    }
}
function validarRut() {
    if(rut.trim() == "" || !rut.includes("-") || rut.length <= 8 || rut.length > 13 ) {
        return false;
    } else {
        return true;
    }
}

function validarTelefono() {
    if(telefono.trim() == "" || telefono.length > 10 || /\D/.test(telefono)) {
        return false;
    } else {
        return true;
    }
}

function validarCorreo() {
    if(correo.trim() == "" || !correo.includes("@") || !correo.includes(".")) {
        return false;
    } else {
        return true;
    }
}