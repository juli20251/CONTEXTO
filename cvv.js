document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('job-application-form');
    const formSuccess = document.getElementById('form-success');
    
    // Validación del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar campos
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const cv = document.getElementById('cv').value;
        
        // Verificar que todos los campos estén completos
        if (nombre === '' || email === '' || mensaje === '' || cv === '') {
            showError('Por favor completa todos los campos');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Validar extensión del CV
        const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
        if (!allowedExtensions.test(cv)) {
            showError('Por favor sube un archivo PDF, DOC o DOCX');
            return;
        }
        
        // Simular envío del formulario (en un caso real, esto se enviaría a un servidor)
        simulateFormSubmission();
    });
    
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Eliminar mensajes de error anteriores
        const previousErrors = document.querySelectorAll('.error-message');
        previousErrors.forEach(error => error.remove());
        
        // Agregar el nuevo mensaje de error
        form.prepend(errorElement);
        
        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    }
    
    function simulateFormSubmission() {
        // Mostrar indicador de carga
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.innerHTML = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular tiempo de procesamiento
        setTimeout(() => {
            // Mostrar mensaje de éxito
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Resetear formulario
            form.reset();
            submitButton.innerHTML = 'Enviar';
            submitButton.disabled = false;
            
            // Opcional: Redireccionar después de un tiempo
            // setTimeout(() => {
            //     window.location.href = "index.html";
            // }, 3000);
        }, 2000);
    }
});

// Validación en tiempo real
document.getElementById('nombre').addEventListener('input', function() {
    validateField(this, this.value.trim() !== '', 'Ingresa tu nombre');
});

document.getElementById('email').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(this, emailRegex.test(this.value), 'Ingresa un correo electrónico válido');
});

document.getElementById('mensaje').addEventListener('input', function() {
    validateField(this, this.value.trim().length > 10, 'Tu mensaje debe tener al menos 10 caracteres');
});

document.getElementById('cv').addEventListener('change', function() {
    const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
    validateField(this, allowedExtensions.test(this.value), 'Sube un archivo PDF, DOC o DOCX');
});

function validateField(field, condition, errorMessage) {
    const validationMessage = field.nextElementSibling;
    
    if (validationMessage && validationMessage.classList.contains('validation-message')) {
        if (!condition && field.value !== '') {
            validationMessage.textContent = errorMessage;
            validationMessage.style.display = 'block';
            field.classList.add('invalid');
        } else {
            validationMessage.style.display = 'none';
            field.classList.remove('invalid');
        }
    }
}