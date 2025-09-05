// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Navbar shrink al hacer scroll
    const navbar = document.querySelector('.custom-navbar');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });
    
    // Botones de reserva (placeholder para integración con n8n)
    const reservaButtons = document.querySelectorAll('#reservaBtn, #ctaReservaBtn');
    
    reservaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí se conectará con n8n para el asistente de IA
            console.log('Botón de reserva clickeado - Conectar con n8n para IA');
            
            // Mostrar mensaje temporal
            showAlert('Próximamente integración con nuestro asistente de IA para reservas', 'info');
        });
    });
    
    // Filtrado de servicios
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const gridItems = document.querySelectorAll('.grid-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría a filtrar
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar los elementos
            gridItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                }
            });
        });
    });
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        // Crear elemento de alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '100px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '1050';
        alertDiv.style.minWidth = '300px';
        alertDiv.style.maxWidth = '500px';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Añadir alerta al documento
        document.body.appendChild(alertDiv);
        
        // Eliminar alerta después de 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 5000);
    }
    
    // Función para reproducir video
    window.playVideo = function(button) {
        const videoContainer = button.closest('.ratio');
        const video = videoContainer.querySelector('video');
        const overlay = videoContainer.querySelector('.video-overlay');
        
        video.play();
        overlay.style.display = 'none';
        video.setAttribute('controls', 'true');
    };
    
    // Efectos hover para las cards de servicios
    const serviceCards = document.querySelectorAll('.service-grid-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mejorar la accesibilidad
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.setAttribute('aria-expanded', 'false');
        
        navbarToggler.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
        });
    }
    
    // Lazy loading para imágenes
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    }
});