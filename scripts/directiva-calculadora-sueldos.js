//Calculo pago por horas
const inputHoras = document.querySelector('#horas-semanales');
const calculo = document.querySelector('.boton-calcular');
const pagoHoras = document.querySelector('#pago-horas');
const pagoBono = document.querySelector('#bono-antiguedad');
const sueldoBruto = document.querySelector('#sueldo-bruto');
const afp = document.querySelector('#afp');
const salud = document.querySelector('#salud');
const sueldoLiquido = document.querySelector('#sueldo-liquido');

calculo.addEventListener('click', (evento)=> {
    evento.preventDefault();
    const nivel = document.querySelector('#nivel').value;
    const horas = Number(inputHoras.value);
    const antiguedad = document.querySelector('#anios-antiguedad').value;
    const porcentaje = 0.015;

    if(nivel == 'media') {
        let pago = horas * 21034;
        let bono = Math.round((antiguedad * porcentaje)*pago);
        let bruto = pago + bono;
        let desc_afp = Math.round(0.1 * bruto);
        let desc_salud = Math.round(0.07 * bruto);
        pagoHoras.textContent = "$" + pago;
        pagoBono.textContent = "$" + bono;
        sueldoBruto.textContent = "$" + bruto; 
        afp.textContent = "$" + desc_afp;
        salud.textContent = "$" + desc_salud;
        let liquido = bruto - desc_salud - desc_afp;
        sueldoLiquido.textContent = "$" + liquido;
    } else {
        let pago = horas * 19992;
        let bono = Math.round((antiguedad * porcentaje)*pago);
        let bruto = pago + bono;
        let desc_afp = Math.round(0.1 * bruto);
        let desc_salud = Math.round(0.07 * bruto);
        pagoHoras.textContent = "$" + pago;
        pagoBono.textContent = "$" + bono;
        sueldoBruto.textContent = "$" + bruto; 
        afp.textContent = "$" + desc_afp;
        salud.textContent = "$" + desc_salud;
        let liquido = bruto - desc_salud - desc_afp;
        sueldoLiquido.textContent = "$" + liquido;
    }
    
})
