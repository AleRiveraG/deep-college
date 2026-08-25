//Busqueda
const busqueda = document.getElementById("busqueda");
busqueda.addEventListener('keyup', (evento)=> {
    const texto = evento.target.value.toLowerCase();
    const filas = document.querySelectorAll('#perfiles tbody tr');

    filas.forEach((fila)=> {
        const textoFila = fila.textContent.toLowerCase();
        if(textoFila.includes(texto)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
});

//Eliminar datos
const tabla = document.getElementById("perfiles");
tabla.addEventListener('click', (evento)=>{
    const boton = evento.target.closest('.btn-eliminar');
    if(boton) {
        const confirmacion = confirm("¿Deseas eliminar el usuario?");
        if(confirmacion == true) {
            evento.preventDefault();
            const fila = boton.closest('tr'); 
            fila.remove();
        }
    }
})

//Editar datos
const botones = document.querySelectorAll('.btn-editar');
const botonesCerrar = document.querySelector('.closeModalBtn');
const botonCerrar = document.querySelector('.btn-cerrar');
const modal = new bootstrap.Modal(
    document.getElementById("editarUsuarioModal")
);
botones.forEach((boton)=> { 
    boton.addEventListener('click', (evento)=> {
        evento.preventDefault();
        modal.show();
    })
})  
botonesCerrar.addEventListener('click', (evento)=> {
    evento.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const rut = document.querySelector('#rut').value;
    if(nombre.length < 1 || !rut.includes("-") || rut.length < 8) {
        alert("Datos no validos")
    }else {
        document.querySelector('#nombre').value = '';
        document.querySelector('#rut').value = '';
        modal.hide();
        alert("Usuario modificado con exito!");
        
    }
    
})
botonCerrar.addEventListener('click', (evento)=> {
    evento.preventDefault();
    modal.hide();
})



