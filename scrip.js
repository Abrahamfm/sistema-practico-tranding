function calcular() {
    // Obtener valores del formulario
    let tasaExito = parseFloat(document.getElementById("tasaExito").value) / 100;
    let numeroOperaciones = parseInt(document.getElementById("numeroOperaciones").value);
    let riesgoRecompensa = parseFloat(document.getElementById("riesgoRecompensa").value);
    let capitalInicial = parseFloat(document.getElementById("capitalInicial").value);
    
    // Porcentaje de riesgo inicial (0.1% del capital)
    let riesgoPorcentaje = 0.001; // 0.1%
    let capitalFinal = capitalInicial;
    let historialCapital = [capitalInicial]; // Para visualizar la evolución del capital

    for (let i = 0; i < numeroOperaciones; i++) {
        let riesgoOperacion = capitalFinal * riesgoPorcentaje; // Ajuste dinámico según capital actual
        let gananciaOperacion = riesgoOperacion * riesgoRecompensa;
        
        if (Math.random() < tasaExito) {
            capitalFinal += gananciaOperacion;
            // Aumenta el porcentaje de riesgo si el capital crece
            riesgoPorcentaje *= 1.05; // Incremento del 5% sobre el riesgo actual
        } else {
            capitalFinal -= riesgoOperacion;
            // Reduce el porcentaje de riesgo si el capital cae
            riesgoPorcentaje *= 0.95; // Reducción del 5% sobre el riesgo actual
        }

        // Limitar el riesgo para evitar que sea demasiado bajo o alto
        if (riesgoPorcentaje < 0.001) riesgoPorcentaje = 0.001; // 0.1% mínimo
        if (riesgoPorcentaje > 0.05) riesgoPorcentaje = 0.05; // 5% máximo

        // Evitar valores negativos de capital
        if (capitalFinal <= 0) {
            capitalFinal = 0;
            break;
        }

        historialCapital.push(capitalFinal);
    }

    // Calcular probabilidad de ganar al menos una vez
    let probGanar = 1 - Math.pow(1 - tasaExito, numeroOperaciones);
    
    // Expectativa matemática ajustada
    let expectativa = (tasaExito * riesgoRecompensa) - ((1 - tasaExito) * 1);

    // Mostrar resultados en pantalla
    let resultado = `
        <p>Probabilidad de ganar al menos una vez: ${ (probGanar * 100).toFixed(2) }%</p>
        <p>Expectativa matemática: ${ expectativa.toFixed(2) }</p>
        <p>Capital final estimado: $${ capitalFinal.toFixed(2) }</p>
        <p>Último porcentaje de riesgo aplicado: ${(riesgoPorcentaje * 100).toFixed(3)}%</p>
    `;
    
    document.getElementById("resultado").innerHTML = resultado;
}
