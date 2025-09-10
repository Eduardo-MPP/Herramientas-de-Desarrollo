// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Navbar shrink al hacer scroll
  const navbar = document.querySelector(".custom-navbar");
  const scrollThreshold = 100;
  window.addEventListener("scroll", function () {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }
  });

  // Botón de reserva
  const reservaBtn = document.querySelector("#reservaBtn");
  if (reservaBtn) {
    reservaBtn.addEventListener("click", function () {
      showAlert(
        "Próximamente integración con nuestro asistente de IA para reservas",
        "info"
      );
    });
  }

  // Formulario de contacto
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Aquí se conectará con backend o n8n
      console.log("Formulario enviado");

      showAlert("¡Gracias por contactarnos! Te responderemos pronto.", "success");
      contactForm.reset();
    });
  }

  // Función para mostrar alertas
  function showAlert(message, type) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "100px";
    alertDiv.style.right = "20px";
    alertDiv.style.zIndex = "1050";
    alertDiv.style.minWidth = "300px";
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 5000);
  }
});
