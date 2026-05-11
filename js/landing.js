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
  
  // LISTADO REAL DEL EQUIPO
  // Leonardo: Aquí es donde editas la información de cada uno.
  const teamMembers = [
    {
      name: "Bradly Gutierrez",
      role: "Integración & Deploy",
      photo: "../img/bradly.jpg", // <-- NOTA: Pon aquí el link de su foto
      bio: "Experto en manejo de APIs y despliegue en la nube.", // <-- NOTA: Su biografía aquí
      github: "#", // <-- NOTA: Su link de GitHub
      linkedin: "#" // <-- NOTA: Su link de LinkedIn
    },
    {
      name: "Eduardo Barrera",
      role: "Login & Session",
      photo: "../img/eduardo.jpg",
      bio: "Especialista en seguridad y persistencia de datos.",
      github: "#",
      linkedin: "#"
    },
    {
      name: "José Zapata",
      role: "Desarrollador Backend",
      photo: "../img/jose.jpg",
      bio: "Apasionado por la arquitectura de software.",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Ana Marbell",
      role: "Responsive & QA",
      photo: "../img/ana.jpg",
      bio: "Asegurando que la experiencia sea perfecta en todo dispositivo.",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Reynerio Muñoz",
      role: "Filtros & UI Detalle",
      photo: "https://via.placeholder.com/150",
      bio: "Enfocado en la usabilidad y búsqueda eficiente.",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Leonardo Obando",
      role: "Landing & API Fetch",
      photo: "../img/leonardo.jpg",
      bio: "Creador de esta interfaz dinámica y conexión de datos.",
      github: "#",
      linkedin: "#"
    }
  ];

  function renderTeam() {
    usersGrid.innerHTML = ""; // Limpiar el "Cargando..."

    teamMembers.forEach(member => {
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
            <a href="${member.linkedin}" target="_blank" class="social-link">LinkedIn</a>
          </div>
        </div>
      `;
      usersGrid.appendChild(card);
    });
  }

  // Ejecutar el renderizado
  renderTeam();
});