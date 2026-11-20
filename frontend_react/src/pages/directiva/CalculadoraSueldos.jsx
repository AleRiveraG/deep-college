import PanelLayout from "../../components/PanelLayout";
import { useEffect, useState } from "react";
import Boton from "../../components/Boton";
import { apiFinanzas } from "../../services/api";

function pesos(monto) {
    return `$${Number(monto).toLocaleString("es-CL")}`;
}

function CalculadoraSueldos() {
    const [horasSemanales, setHorasSemanales] = useState(0);
    const [aniosAntiguedad, setAniosAntiguedad] = useState(0);
    const [nivel, setNivel] = useState("basica");
    const [pagoHoras, setPagoHoras] = useState(0);
    const [bonoAnios, setBonoAnios] =  useState(0);
    const [afp, setAfp] = useState(0);
    const [salud, setSalud] = useState(0);
    const [sueldoBruto, setSueldoBruto] = useState(0);
    const [sueldoLiquido, setSueldoLiquido] = useState(0);
    const [valorHoraMedia, setValorHoraMedia] = useState(21034);
    const [valorHoraBasica, setValorHoraBasica] = useState(19992);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // Valores por hora desde el backend de finanzas (si falla, quedan los de respaldo)
    useEffect(() => {
        apiFinanzas("/api/v1/finanzas/parametros")
            .then((p) => {
                setValorHoraMedia(p.valorHoraMedia);
                setValorHoraBasica(p.valorHoraBasica);
            })
            .catch(() => {});
    }, []);

    function validarCampos() {
        const horas = Number(horasSemanales);
        const anios = Number(aniosAntiguedad);
        return (
            Number.isInteger(horas) && horas >= 1 && horas <= 42 &&
            Number.isInteger(anios) && anios >= 0 && anios <= 50 &&
            (nivel === "basica" || nivel === "media")
        );
    }

    async function calcular(evento) {
        evento.preventDefault();
        setError("");

        if (!validarCampos()) {
            setError("Datos inválidos: horas entre 1 y 42, años entre 0 y 50 (números enteros).");
            return;
        }

        setCargando(true);
        try {
            const r = await apiFinanzas("/api/v1/finanzas/sueldos/calcular", {
                method: "POST",
                body: JSON.stringify({
                    horasSemanales: Number(horasSemanales),
                    aniosAntiguedad: Number(aniosAntiguedad),
                    nivel,
                }),
            });
            setPagoHoras(r.pagoHoras);
            setBonoAnios(r.bonoAnios);
            setAfp(r.afp);
            setSalud(r.salud);
            setSueldoBruto(r.sueldoBruto);
            setSueldoLiquido(r.sueldoLiquido);
        } catch (e) {
            setError(e.message || "No se pudo calcular el sueldo.");
        } finally {
            setCargando(false);
        }
    }

    return(
        <PanelLayout claseSeccion="py-4 px-4 seccion-calculadora">
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
                            <strong className="monto-valor hora-media fs-4">{pesos(valorHoraMedia)}</strong>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 border caja-valor h-100">
                            <span className="d-block mb-1 etiqueta-valor small">Valor Hora Educación Básica</span>
                            <strong className="monto-valor fs-4">{pesos(valorHoraBasica)}</strong>
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

                    {error && <div className="alert alert-danger py-2 small" role="alert">{error}</div>}
                    
                    <Boton
                      tipo="submit"
                      clase="btn btn-sm boton-calcular px-4"
                      onClick={calcular}
                      deshabilitado={cargando}
                      texto={cargando ? "Calculando..." : "Calcular"}
                    />
                    
                    <hr className="my-5" style={{ borderColor: "#283A94;" }} />
                    
                    <div className="row contenedor-resultados">
                        <div className="col-md-6 px-4 columna-resultados columna-haberes border-end">
                            <h3 className="fs-5 mb-4">Haberes</h3>
                            <div className="mt-3 detalle-resultados">
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="etiqueta-resultado">Pago por horas</span>
                                    <span id="pago-horas" className="fw-bold monto-resultado">{pesos(pagoHoras)}</span>
                                </div>
                                <hr className="text-muted" />
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="etiqueta-resultado">Bono años de antiguedad</span>
                                    <span id="bono-antiguedad" className="fw-bold monto-resultado">{pesos(bonoAnios)}</span>
                                </div>
                                <hr className="text-muted" />
                                <div className="d-flex justify-content-between fs-5">
                                    <strong className="etiqueta-total text-dark">Sueldo Bruto</strong>
                                    <strong id="sueldo-bruto" className="monto-total text-dark">{pesos(sueldoBruto)}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 px-4 columna-resultados columna-descuentos">
                            <h3 className="fs-5 mb-4">Descuentos Legales</h3>
                            <div className="mt-3 detalle-resultados">
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="etiqueta-resultado">AFP</span>
                                    <span id="afp" className="fw-bold monto-resultado">{pesos(afp)}</span>
                                </div>
                                <hr className="text-muted" />
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="etiqueta-resultado">Salud</span>
                                    <span id="salud" className="fw-bold monto-resultado">{pesos(salud)}</span>
                                </div>
                                <hr className="text-muted" />
                                <div className="d-flex justify-content-between fs-5">
                                    <strong className="etiqueta-total text-dark">Sueldo Liquido</strong>
                                    <strong id="sueldo-liquido" className="monto-total text-dark">{pesos(sueldoLiquido)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PanelLayout>
    );

}

export default CalculadoraSueldos;