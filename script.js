document.addEventListener('DOMContentLoaded', () => {
    const authInputSection = document.getElementById('auth-input');
    const authResultSection = document.getElementById('auth-result');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const authenticateButton = document.getElementById('authenticateButton');
    const resultBox = document.getElementById('resultBox');
    const resultText = document.getElementById('resultText');
    const scoreText = document.getElementById('scoreText');
    const resetButton = document.getElementById('resetButton');

    // Función para simular el llamado a tu orquestador
    async function callOrchestrator(number) {
        // **IMPORTANTE:** Aquí es donde harías el fetch a tu ORQUESTADOR (Make/Pipedream/Cloud Function)
        // Por ahora, simulamos una respuesta después de un tiempo
        
        console.log(`Simulando llamada a orquestador con número: ${number}`);
        
        // Simulación de delay de red
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        // --- Lógica de simulación de respuesta del orquestador ---
        // Puedes cambiar esto para probar diferentes escenarios
        const mockResponses = [
            { decision: 'APROBADO', score: 95, type: 'success', message: 'Acceso seguro concedido.' },
            { decision: 'REVISIÓN', score: 40, type: 'warning', message: 'Se requiere verificación adicional. Posible cambio de SIM.' },
            { decision: 'BLOQUEADO', score: 5, type: 'danger', message: 'Acceso denegado por alto riesgo de fraude.' }
        ];

        // Elegimos una respuesta aleatoria para el demo, o una específica para ciertos números
        let mockResult;
        if (number.includes('111')) { // Ejemplo: Si el número tiene 111, forzamos un bloqueo
            mockResult = mockResponses[2]; 
        } else if (number.includes('222')) { // Si tiene 222, forzamos revisión
            mockResult = mockResponses[1];
        } else {
            mockResult = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        }
        // --- Fin de lógica de simulación ---

        return mockResult;
    }

    // Manejar el clic del botón de autenticación
    authenticateButton.addEventListener('click', async () => {
        const phoneNumber = phoneNumberInput.value.trim();

        if (phoneNumber === '') {
            alert('Por favor, ingresa un número de teléfono.');
            return;
        }

        // Deshabilitar UI durante la llamada
        authenticateButton.disabled = true;
        phoneNumberInput.disabled = true;
        authenticateButton.textContent = 'Autenticando...';
        resultBox.className = 'result-box'; // Limpia clases anteriores
        resultText.textContent = 'Procesando tu solicitud...';
        scoreText.textContent = '';
        authInputSection.classList.add('hidden');
        authResultSection.classList.remove('hidden');


        // Llamar a la función que simula la comunicación con el orquestador
        const result = await callOrchestrator(phoneNumber);

        // Mostrar el resultado
        resultText.textContent = `${result.message}`;
        scoreText.textContent = `Score de Confianza: ${result.score}`;
        resultBox.classList.add(result.type); // Aplica clase de estilo (success, warning, danger)

        // Habilitar el botón de reset
        resetButton.disabled = false;
    });

    // Manejar el clic del botón de volver a intentar
    resetButton.addEventListener('click', () => {
        authResultSection.classList.add('hidden');
        authInputSection.classList.remove('hidden');

        phoneNumberInput.value = ''; // Limpiar el campo
        authenticateButton.disabled = false;
        phoneNumberInput.disabled = false;
        authenticateButton.textContent = 'Autenticar de forma segura';
        resultBox.className = 'result-box'; // Limpiar clases
        resultText.textContent = '';
        scoreText.textContent = '';
    });
});