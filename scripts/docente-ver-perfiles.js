const cursos = document.querySelector('#cursos');
const tabla = document.querySelector('.tabla');

cursos.addEventListener('change', (evento)=>{
    const opcion = evento.target.value;

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

const busqueda = document.getElementById("busqueda");
busqueda.addEventListener('keyup', (evento)=> {
    const texto = evento.target.value.toLowerCase();
    const filas = tabla.querySelectorAll('tbody tr');

    filas.forEach((fila)=> {
        const textoFila = fila.textContent.toLowerCase();
        if(textoFila.includes(texto)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
});