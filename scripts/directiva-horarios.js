const curso = document.querySelector('#curso');
const horario = document.querySelector('#horario');

curso.addEventListener('change', (evento)=> {
    const opcion = evento.target.value;
    horario.classList.remove('d-none');

})
