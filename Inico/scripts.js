// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Scroll suave para enlaces de navegación
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
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
                
                // Cerrar menú colapsable en dispositivos móviles
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarToggler && !navbarCollapse.classList.contains('show')) {
                    return;
                }
                
                navbarToggler.click();
            }
        });
    });
    
    // Botones de reserva (placeholder para integración con n8n)
    const reservaButtons = document.querySelectorAll('#reservaBtn, #heroReservaBtn, #ctaReservaBtn');
    
    reservaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí se conectará con n8n para el asistente de IA
            console.log('Botón de reserva clickeado - Conectar con n8n para IA');
            
            // Mostrar mensaje temporal
            showAlert('Próximamente integración con nuestro asistente de IA para reservas', 'info');
        });
    });
    
    // Animación de contadores
    const counters = document.querySelectorAll('[data-counter]');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 segundos
        const step = Math.ceil(target / (duration / 16)); // 60fps
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = current + '+';
            }
        }, 16);
    }
    
    function checkCounterVisibility() {
        counters.forEach(counter => {
            const counterPosition = counter.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (counterPosition < screenPosition && !counter.classList.contains('animated')) {
                animateCounter(counter);
                counter.classList.add('animated');
            }
        });
    }
    
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
    
    // Animaciones de elementos al hacer scroll
    const animatedElements = document.querySelectorAll('.service-card, .section-title');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
        
        checkCounterVisibility();
    }
    
    // Verificar scroll al cargar y al hacer scroll
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar elementos visibles al cargar la página
    
    // Mejorar la accesibilidad del menú hamburguesa
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.setAttribute('aria-expanded', 'false');
        
        navbarToggler.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
        });
    }
    
    // Tooltips para iconos sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.setAttribute('data-bs-toggle', 'tooltip');
        const platform = icon.querySelector('i').classList[1].replace('fa-', '').replace('fab-', '');
        icon.setAttribute('title', `Síguenos en ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
    });
    
    // Inicializar tooltips
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});