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
    
    // Filtrado de especialidades
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
    
    // Datos de los doctores para el modal
    const doctorsData = {
        1: {
            name: "Dr. Javier Mendoza",
            specialty: "Ortodoncista",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Especializado en ortodoncia invisible y tratamientos para adultos y niños.",
            education: [
                "Licenciado en Odontología - Universidad de Buenos Aires",
                "Especialización en Ortodoncia - Universidad Complutense de Madrid",
                "Certificación Invisalign - Nivel Diamond Provider"
            ],
            experience: "15 años de experiencia en ortodoncia",
            specialties: ["Invisalign", "Brackets estéticos", "Ortopedia dentofacial"]
        },
        2: {
            name: "Dra. Elena Rodríguez",
            specialty: "Implantóloga",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Experta en rehabilitación oral y sonrisas con implantes dentales.",
            education: [
                "Licenciada en Odontología - Universidad Nacional Autónoma de México",
                "Maestría en Implantología - Universidad de Barcelona",
                "Certificación en Cirugía Guiada - Instituto Straumann"
            ],
            experience: "12 años de experiencia en implantología",
            specialties: ["Implantes dentales", "Prótesis sobre implantes", "Regeneración ósea"]
        },
        3: {
            name: "Dra. Carmen Vázquez",
            specialty: "Especialista en Estética Dental",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Apasionada por crear sonrisas naturales y armoniosas.",
            education: [
                "Licenciada en Odontología - Universidad de Sevilla",
                "Especialización en Estética Dental - Universidad de Nueva York",
                "Certificación en Diseño Digital de Sonrisa - DSD"
            ],
            experience: "10 años de experiencia en estética dental",
            specialties: ["Carillas de porcelana", "Blanqueamiento dental", "Diseño de sonrisa digital"]
        },
        4: {
            name: "Dr. Roberto Silva",
            specialty: "Cirujano Oral",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Especializado en cirugías complejas y procedimientos con sedación.",
            education: [
                "Licenciado en Odontología - Universidad de Chile",
                "Especialización en Cirugía Oral y Maxilofacial - Universidad de Texas",
                "Certificación en Sedación Consciente - AAOMS"
            ],
            experience: "18 años de experiencia en cirugía oral",
            specialties: ["Cirugía de cordales", "Implantes complejos", "Cirugía reconstructiva"]
        },
        5: {
            name: "Dra. Sofia López",
            specialty: "Periodoncista",
            image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Experta en el tratamiento de encías y enfermedades periodontales.",
            education: [
                "Licenciada en Odontología - Universidad de Costa Rica",
                "Especialización en Periodoncia - Universidad de Harvard",
                "Certificación en Terapia periodontal láser - Institute for Advanced Laser Dentistry"
            ],
            experience: "14 años de experiencia en periodoncia",
            specialties: ["Periodoncia", "Cirugía de encías", "Implantes periodontales"]
        },
        6: {
            name: "Dr. Miguel Ángel Torres",
            specialty: "Endodoncista",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Especializado en tratamientos de conductos y salvamento dental.",
            education: [
                "Licenciado en Odontología - Universidad Nacional de Colombia",
                "Especialización en Endodoncia - Universidad de Pennsylvania",
                "Certificación en Microscopía Endodóntica - Global Microscopy Academy"
            ],
            experience: "11 años de experiencia en endodoncia",
            specialties: ["Endodoncia microscópica", "Retratamientos", "Cirugía apical"]
        }
    };
    
    // Manejar el modal de información de doctores
    const doctorModal = document.getElementById('doctorModal');
    if (doctorModal) {
        doctorModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const doctorId = button.getAttribute('data-doctor');
            const doctor = doctorsData[doctorId];
            
            const modalTitle = doctorModal.querySelector('.modal-title');
            const modalBody = doctorModal.querySelector('.modal-body');
            
            modalTitle.textContent = doctor.name;
            
            // Crear contenido del modal
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${doctor.image}" alt="${doctor.name}" class="img-fluid rounded mb-3">
                        <h5 class="text-primary">${doctor.specialty}</h5>
                        <p class="text-muted">${doctor.experience}</p>
                    </div>
                    <div class="col-md-8">
                        <h4 class="mb-3">Sobre ${doctor.name.split(' ')[0]}</h4>
                        <p>${doctor.description}</p>
                        
                        <h5 class="mt-4">Formación Académica</h5>
                        <ul>
                            ${doctor.education.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        
                        <h5 class="mt-4">Especialidades</h5>
                        <div class="d-flex flex-wrap">
                            ${doctor.specialties.map(spec => `<span class="badge bg-primary me-2 mb-2">${spec}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
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
    
    // Efectos hover para las cards de equipo
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
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