const cursos = document.querySelector('#curso');
const tabla_1 = document.querySelector('#tabla-1');
const tabla_2 = document.querySelector('#tabla-2');
const tabla_3 = document.querySelector('#tabla-3');
const calcular = document.querySelector('#btn-calcular');
const registrar = document.querySelector('#btn-registrar');
const inputs = document.querySelectorAll('input');
const cont_botones = document.querySelector('#cont-botones');

cursos.addEventListener('change', (evento)=>{
    const opcion = evento.target.value;
    
    tabla_1.classList.add('d-none');
    tabla_2.classList.add('d-none');
    tabla_3.classList.add('d-none');

    cont_botones.classList.remove('d-none');

    if(opcion === '1-medio' || opcion === '4-medio') {
        tabla_1.classList.remove('d-none');
    } else if (opcion === '2-medio') {
        tabla_2.classList.remove('d-none');
    } else {
        tabla_3.classList.remove('d-none')
    }

})

inputs.forEach(input => {
    input.disabled = true;
    input.value = "";
    calcular.disabled = true;
})

registrar.addEventListener('click', (evento)=>{
    evento.preventDefault();
    inputs.forEach(input => {
        input.disabled = false;
    })
    calcular.disabled = false;
})




calcular.addEventListener('click', ()=>{

    tablas = [tabla_1, tabla_2, tabla_3];

    tablas.forEach((tabla) =>{

        const filas = tabla.querySelectorAll('tbody tr');

        filas.forEach((fila) =>{

            let es1 = fila.querySelector('.es1').value;
            let es2 = fila.querySelector('.es2').value;
            let ef1 = fila.querySelector('.ef1').value;
            let ef2 = fila.querySelector('.ef2').value;
            let ed1 = fila.querySelector('.ed1').value;
            let ed2 = fila.querySelector('.ed2').value;
            let ed3 = fila.querySelector('.ed3').value;

            const promedio = fila.querySelector('.promedio');

            let promedio_sumativa = (Number(es1)+ Number(es2))/2;
            console.log("Sumativa: "+promedio_sumativa)
            let promedio_formativa = (Number(ef1) + Number(ef2))/2;
            console.log("Formativa "+promedio_formativa)
            let promedio_desempeno = (Number(ed1) + Number(ed2) + Number(ed3))/3;
            console.log("Desempeño "+promedio_desempeno);

            let promedio_final = (promedio_sumativa*0.35) + (promedio_formativa*0.35) + (promedio_desempeno * 0.3);
            promedio.textContent = promedio_final.toFixed(1);

        
        });
    });



    

})