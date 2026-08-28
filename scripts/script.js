const nombre = document.querySelector('#nombre');
const fecha = document.querySelector('#fecha');

const fechaHoy = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
fecha.textContent = fechaHoy.toLocaleDateString('es-ES', options);;

