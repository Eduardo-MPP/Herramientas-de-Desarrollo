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
    const reservaButtons = document.querySelectorAll('#reservaBtn');
    
    reservaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí se conectará con n8n para el asistente de IA
            console.log('Botón de reserva clickeado - Conectar con n8n para IA');
            
            // Mostrar mensaje temporal
            showAlert('Próximamente integración con nuestro asistente de IA para reservas', 'info');
        });
    });
    
    // Filtrado de testimonios
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
    
    // Sistema de calificación con estrellas
    const stars = document.querySelectorAll('.rating-input .stars i');
    const ratingInput = document.getElementById('rating');
    
    if (stars.length && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Actualizar visualización de estrellas
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas', 'active');
                    } else {
                        s.classList.remove('fas', 'active');
                        s.classList.add('far');
                    }
                });
            });
            
            // Efecto hover
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // Restaurar al quitar hover
            star.addEventListener('mouseout', function() {
                const currentRating = ratingInput.value || 0;
                
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= currentRating) {
                        s.classList.remove('far');
                        s.classList.add('fas', 'active');
                    } else {
                        s.classList.remove('fas', 'active');
                        s.classList.add('far');
                    }
                });
            });
        });
    }
    
    // Validación del formulario de testimonio
    const testimonialForm = document.getElementById('testimonialForm');
    
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            
            // Si la validación es exitosa, procesar el formulario
            processTestimonial(this);
        });
    }
    
    // Función para procesar testimonio
    function processTestimonial(form) {
        const formData = new FormData();
        const formElements = form.querySelectorAll('input, select, textarea');
        
        formElements.forEach(element => {
            if (element.name || element.id) {
                const key = element.name || element.id;
                formData.append(key, element.value);
            }
        });
        
        // Simular envío a un endpoint (en un caso real, sería una petición fetch)
        console.log('Datos del testimonio:', Object.fromEntries(formData));
        
        // Mostrar mensaje de éxito
        showAlert('¡Gracias por compartir tu experiencia! Tu testimonio será revisado y publicado pronto.', 'success');
        
        // Reiniciar formulario
        form.classList.remove('was-validated');
        form.reset();
        
        // Reiniciar estrellas
        if (stars.length && ratingInput) {
            stars.forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
            ratingInput.value = '';
        }
    }
    
    // Botones de responder
    const replyButtons = document.querySelectorAll('.testimonial-footer .btn');
    
    replyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí se podría implementar un sistema de respuestas
            showAlert('Función de respuesta en desarrollo. Próximamente podrás interactuar con los testimonios.', 'info');
        });
    });
    
    // Animación de contadores
    const counters = document.querySelectorAll('[data-counter]');
    
    function animateCounter(counter) {
        let target;
        const currentValue = counter.getAttribute('data-counter');
        
        if (currentValue.includes('.')) {
            target = parseFloat(currentValue);
            let current = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toFixed(1);
                    clearInterval(timer);
                } else {
                    counter.textContent = current.toFixed(1);
                }
            }, 16);
        } else {
            target = parseInt(currentValue);
            let current = 0;
            const duration = 2000;
            const increment = Math.ceil(target / (duration / 16));
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (target > 10 ? '+' : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = current + (target > 10 ? '+' : '');
                }
            }, 16);
        }
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
    
    // Efectos hover para las cards de testimonios
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
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
    
    // Verificar scroll al cargar y al hacer scroll
    window.addEventListener('scroll', function() {
        checkCounterVisibility();
    });
    
    checkCounterVisibility(); // Verificar contadores visibles al cargar la página
    
    // Mejorar la accesibilidad
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.setAttribute('aria-expanded', 'false');
        
        navbarToggler.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
        });
    }
});