const cursos = document.querySelector('#curso');
const resumenes = document.querySelector('.resumenes');

let cursoActivo = null;

cursos.addEventListener('change', ()=>{
    resumenes.classList.remove('d-none');

    if(cursoActivo) {
        cursoActivo.classList.add('d-none');
    }
    
    const dato = '#'+'curso-'+cursos.value;
    const curso = document.querySelector(dato);
    curso.classList.remove('d-none');
    cursoActivo = curso;
})