// Funcionalidad para cerrar alertas automáticamente
document.addEventListener('DOMContentLoaded', function() {
    // Auto-cerrar alertas después de 5 segundos
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            // Crea un objeto bootstrap alert y lo cierra
            new bootstrap.Alert(alert).close();
        }, 5000);
    });

    // Activar tooltips de Bootstrap
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Manejar categorías activas en la lista de productos
    const categoryLinks = document.querySelectorAll('.list-group-item-action');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function() {
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animación para mostrar productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Validación de formularios
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Previsualización de imágenes en el formulario de productos
    const imageInput = document.querySelector('input[type="file"][name="imagen"]');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    let previewContainer = document.querySelector('.image-preview');
                    if (!previewContainer) {
                        previewContainer = document.createElement('div');
                        previewContainer.className = 'image-preview mt-2';
                        imageInput.parentNode.appendChild(previewContainer);
                    }
                    
                    previewContainer.innerHTML = `
                        <img src="${e.target.result}" class="img-thumbnail" style="max-height: 200px;">
                        <div class="mt-1 small text-muted">Vista previa de la imagen</div>
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});