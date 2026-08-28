const cursos = document.querySelector('#cursos');
const tabla = document.querySelector('.tabla');

cursos.addEventListener('change', ()=>{
    tabla.classList.remove('d-none');
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