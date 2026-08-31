const cursos = document.querySelector('#cursos');
const tabla_1 = document.querySelector('#tabla-1');
const tabla_2 = document.querySelector('#tabla-2');
const tabla_3 = document.querySelector('#tabla-3');

cursos.addEventListener('change', (evento)=>{
    const opcion = evento.target.value;

    tabla_1.classList.add('d-none');
    tabla_2.classList.add('d-none');
    tabla_3.classList.add('d-none');

    if(opcion === '1-medio' || opcion === '4-medio') {
        tabla_1.classList.remove('d-none');
    } else if (opcion === '2-medio') {
        tabla_2.classList.remove('d-none');
    } else {
        tabla_3.classList.remove('d-none')
    }
})

const busqueda = document.getElementById("busqueda");
busqueda.addEventListener('keyup', (evento)=> {
    const texto = evento.target.value.toLowerCase();

    const tablas = [tabla_1, tabla_2, tabla_3];

    tablas.forEach((tabla) =>{
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
});