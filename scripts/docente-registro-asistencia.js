const curso = document.querySelector('#curso');
const tabla = document.querySelector('#tabla-1');
const tabla_2 = document.querySelector('#tabla-2');
const tabla_3 = document.querySelector('#tabla-3');
const botones = document.querySelectorAll('.botones');
const registrar = document.querySelector('#registrar');
const finalizar = document.querySelector('#finalizar');

curso.addEventListener('change', (evento)=> {
    const opcion = evento.target.value;
    
    botones.forEach(boton => {
        boton.disabled = true;
    })

    tabla.classList.add('d-none');
    tabla_2.classList.add('d-none');
    tabla_3.classList.add('d-none');

    if(opcion === '1-medio' || opcion === '4-medio') {
        tabla.classList.remove('d-none');
    } else if (opcion === '2-medio') {
        tabla_2.classList.remove('d-none');
    } else {
        tabla_3.classList.remove('d-none')
    }
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
    alert('Clase finalizada con exito!')
})