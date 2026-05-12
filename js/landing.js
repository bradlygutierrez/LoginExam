
const teamMembers = [
  {
    name: "Bradly Gutierrez",
    role: "Integración & Deploy",
    photo: "../img/bradly.jpg",
    bio: "Experto en manejo de APIs y despliegue en la nube.",
    github: "https://github.com/bradlygutierrez",
    linkedin: "https://www.linkedin.com/in/bradly-guti%C3%A9rrez/"
  },

  {
    name: "Eduardo Barrera",
    role: "Login & Session",
    photo: "../img/eduardo.jpg",
    bio: "Especialista en seguridad y persistencia de datos.",
    github: "https://github.com/Eduardobarrera487",
    linkedin: "#"
  },
  {
    name: "José Zapata",
    role: "Desarrollador Backend",
    photo: "../img/jose.jpg",
    bio: "Apasionado por la arquitectura de software.",
    github: "https://github.com/JoseZapatar",
    linkedin: "#"
  },
  {
    name: "Ana Marbell",
    role: "Responsive & QA",
    photo: "../img/ana.jpg",
    bio: "Asegurando que la experiencia sea perfecta en todo dispositivo.",
    github: "https://github.com/marbell04",
    linkedin: "https://www.linkedin.com/in/ana-marbell-zepeda-2372952b6/"
  },
  {
    name: "Reynerio Muñoz",
    role: "Filtros & UI Detalle",
    photo: "../img/reynerio.jpg",
    bio: "Enfocado en la usabilidad y búsqueda eficiente.",
    github: "https://github.com/Cefirica",
    linkedin: "#"
  },
  {
    name: "Leonardo Obando",
    role: "Landing & API Fetch",
    photo: "../img/leonardo.jpg",
    bio: "Creador de esta interfaz dinámica y conexión de datos.",
    github: "https://github.com/LeObando07",
    linkedin: "https://www.linkedin.com/in/leonardobando080207?trk=contact-info"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const usersGrid = document.getElementById("usersGrid");
  const logoutBtn = document.getElementById("logoutBtn"); // Referencia al botón

  // --- FUNCIÓN PARA CERRAR SESIÓN ---
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // 1. Borramos los datos de sesión (token y usuario)
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("authUser");

      // Opcional: sessionStorage.clear(); // Esto borra TODO lo que haya en sesión

      // 2. Redirigimos al login
      window.location.replace("index.html");
    });
  }

  function renderTeam(list = teamMembers) {
    usersGrid.innerHTML = ""; // Limpiar el "Cargando..."

    if (list.length === 0) {
      usersGrid.innerHTML = `<p class="text-center w-full" style="color: var(--color-text-muted);">No se encontraron integrantes con esos criterios.</p>`;
      return;
    }

    list.forEach(member => {

      

      const card = document.createElement("article");
      card.className = "card user-card";

      card.innerHTML = `
        <img src="${member.photo}" alt="${member.name}" class="user-avatar">
        <h3>${member.name}</h3>
        <p class="user-role">${member.role}</p>

        <div class="user-details">
          <p class="user-bio">${member.bio}</p>
          <div class="user-links">
            <a href="${member.github}" target="_blank" class="social-link">GitHub</a>
            <a href="${member.linkedin}" id="linkedinbtn" target="_blank" class="social-link">LinkedIn</a>
          </div>
        </div>
      `;
      usersGrid.appendChild(card);

      if (member.linkedin === "#") {
        const linkedinBtn = card.querySelector("#linkedinbtn");
        if (linkedinBtn) {
          linkedinBtn.remove();
        }};
    });
  }

  // Exponer para que filtro.js pueda usarlo
  window.teamMembers = teamMembers;
  window.renderTeam = renderTeam;

  // Ejecutar el renderizado inicial
  renderTeam();
});