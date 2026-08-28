const curso = document.querySelector('#curso');
const tabla = document.querySelector('#tabla');
const botones = document.querySelectorAll('.botones');
const registrar = document.querySelector('#registrar');
const finalizar = document.querySelector('#finalizar');

curso.addEventListener('change', (evento)=> {
    const opcion = evento.target.value;
    tabla.classList.remove('d-none');

    botones.forEach(boton => {
        boton.disabled = true;
    })
})

registrar.addEventListener('click', ()=> {
    botones.forEach(boton => {
        boton.disabled = false;
    })
})

const presentes = document.querySelector('.presente');

presentes.addEventListener('click', ()=> {
    presentes.checked = true;
})

const ausentes = document.querySelector('.ausente');

ausentes.addEventListener('click', ()=> {
    ausentes.checked = true;
})

finalizar.addEventListener('click', ()=> {
    botones.forEach(boton => {
        boton.disabled = true;
    })
})