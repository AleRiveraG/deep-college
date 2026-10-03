import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useState } from "react";

function CalculadoraSueldos() {
    const [horasSemanales, setHorasSemanales] = useState(0);
    const [aniosAntiguedad, setAniosAntiguedad] = useState(0);
    const [nivel, setNivel] = useState(null);
    const [pagoHoras, setPagoHoras] = useState(0);
    const [bonoAnios, setBonoAnios] =  useState(0);
    const [afp, setAfp] = useState(0);
    const [salud, setSalud] = useState(0);
    const [sueldoBruto, setSueldoBruto] = useState(0);
    const [sueldoLiquido, setSueldoLiquido] = useState(0);

    function validarCampos() {
            return(
                horasSemanales > 0 &&
                aniosAntiguedad >= 0 &&
                nivel != ""
            );
        }

    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">

                        <NavBar />

                        <section className="col-md-10 py-4 px-4 seccion-calculadora">
                            <h1 className="mb-4">Calculadora de sueldos</h1>
                            <h2 className="fs-6 mb-4">Calcula y consulta los sueldos de los trabajadores.</h2>
                            
                            <div className="mb-5 mt-4 seccion-valores-nacionales text-center">
                                <h2 className="fs-4 mb-4">Valores nacionales</h2>
                                <div className="row text-center mt-3 contenedor-valores g-4">
                                    <div className="col-md-4">
                                        <div className="p-3 border caja-valor h-100">
                                            <span className="d-block mb-1 etiqueta-valor small">Sueldo Mínimo</span>
                                            <strong className="monto-valor fs-4">$553.553</strong>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-3 border caja-valor h-100">
                                            <span className="d-block mb-1 etiqueta-valor small">Valor Hora Educación Media</span>
                                            <strong className="monto-valor hora-media fs-4">$21.034</strong>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-3 border caja-valor h-100">
                                            <span className="d-block mb-1 etiqueta-valor small">Valor Hora Educación Básica</span>
                                            <strong className="monto-valor fs-4">$19.992</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="contenedor-formulario">
                                <form className="formulario-calculadora">
                                    <div className="row mb-4 fila-inputs">
                                        <div className="col-md-4">
                                            <label htmlFor="horas-semanales" className="form-label fw-bold small">Horas semanales</label>
                                            <input id="horas-semanales" type="number" className="form-control form-control-sm campo-formulario" min="0" max="42" value={horasSemanales} onChange={(evento) => setHorasSemanales(evento.target.value)}/> 
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="anios-antiguedad" className="form-label fw-bold small">Años de antiguedad</label>
                                            <input id="anios-antiguedad" type="number" className="form-control form-control-sm campo-formulario" min="0" max="50" value={aniosAntiguedad} onChange={(evento) => setAniosAntiguedad(evento.target.value)}/>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="nivel" className="form-label fw-bold small">Nivel de enseñanza:</label>
                                            <select id="nivel" className="form-select form-select-sm campo-formulario" value={nivel} onChange={(evento) => setNivel(evento.target.value)}>
                                                <option value="basica">Educación Básica</option>
                                                <option value="media">Educación Media</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-sm boton-calcular px-4"
                                    onClick={ (evento) => {
                                        evento.preventDefault();
                                        if(validarCampos()) {
                                            const porcentaje = 0.015;

                                            if(nivel === 'media') {
                                                const pago = horasSemanales * 21034;
                                                
                                                const bono = Math.round((aniosAntiguedad * porcentaje)*pago);
                                                
                                                const bruto = pago + bono;
                                                
                                                const desc_afp = Math.round(0.1 * bruto);
                                                const desc_salud = Math.round(0.07 * bruto);
                                                
                                                const liquido = bruto - desc_salud - desc_afp;

                                                setPagoHoras(pago);
                                                setBonoAnios(bono);
                                                setAfp(desc_afp);
                                                setSalud(desc_salud);
                                                setSueldoBruto(bruto);
                                                setSueldoLiquido(liquido);
                                                
                                            } else {
                                                const pago = horasSemanales * 19992;

                                                const bono = Math.round((aniosAntiguedad * porcentaje)*pago);
                                                
                                                const bruto = pago + bono;
                                                
                                                const desc_afp = Math.round(0.1 * bruto);
                                                const desc_salud = Math.round(0.07 * bruto);
                                                
                                                const liquido = bruto - desc_salud - desc_afp;
                                                
                                                setPagoHoras(pago);
                                                setBonoAnios(bono);
                                                setAfp(desc_afp);
                                                setSalud(desc_salud);
                                                setSueldoBruto(bruto);
                                                setSueldoLiquido(liquido);
                                            }
                                        } else {
                                            alert("Datos invalidos, ingrese nuevamente.")
                                        }
                                    }}
                                    >
                                        Calcular
                                    </button>
                                    
                                    <hr className="my-5" style={{ borderColor: "#283A94;" }} />
                                    
                                    <div className="row contenedor-resultados">
                                        <div className="col-md-6 px-4 columna-resultados columna-haberes border-end">
                                            <h3 className="fs-5 mb-4">Haberes</h3>
                                            <div className="mt-3 detalle-resultados">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">Pago por horas</span>
                                                    <span id="pago-horas" className="fw-bold monto-resultado">${pagoHoras}</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">Bono años de antiguedad</span>
                                                    <span id="bono-antiguedad" className="fw-bold monto-resultado">${bonoAnios}</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between fs-5">
                                                    <strong className="etiqueta-total text-dark">Sueldo Bruto</strong>
                                                    <strong id="sueldo-bruto" className="monto-total text-dark">${sueldoBruto}</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 px-4 columna-resultados columna-descuentos">
                                            <h3 className="fs-5 mb-4">Descuentos Legales</h3>
                                            <div className="mt-3 detalle-resultados">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">AFP</span>
                                                    <span id="afp" className="fw-bold monto-resultado">${afp}</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">Salud</span>
                                                    <span id="salud" className="fw-bold monto-resultado">${salud}</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between fs-5">
                                                    <strong className="etiqueta-total text-dark">Sueldo Liquido</strong>
                                                    <strong id="sueldo-liquido" className="monto-total text-dark">${sueldoLiquido}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );

}

export default CalculadoraSueldos;