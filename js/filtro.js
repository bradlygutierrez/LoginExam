// Filtro del equipo: busca por nombre y/o rol.
// Los datos vienen de landing.js (window.teamMembers) y el render de window.renderTeam.

document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.getElementById("filterContainer");
  if (!filterContainer) return;

  // Construir la UI del filtro
  filterContainer.innerHTML = `
    <div class="filter-bar">
      <div class="input-group filter-field">
        <label for="searchInput" class="input-label">Buscar por nombre o rol</label>
        <input
          type="text"
          id="searchInput"
          class="input"
          placeholder="Ej: Eduardo, Backend, QA..."
          autocomplete="off"
        />
      </div>
      <div class="input-group filter-field">
        <label for="roleSelect" class="input-label">Filtrar por rol</label>
        <select id="roleSelect" class="input">
          <option value="">Todos los roles</option>
        </select>
      </div>
    </div>
  `;

  const searchInput = document.getElementById("searchInput");
  const roleSelect = document.getElementById("roleSelect");

  // Llenar dinámicamente los roles disponibles desde los datos
  const roles = [...new Set((window.teamMembers || []).map(m => m.role))].sort();
  roles.forEach(role => {
    const opt = document.createElement("option");
    opt.value = role;
    opt.textContent = role;
    roleSelect.appendChild(opt);
  });

  // Aplicar filtros combinados (texto Y rol)
  function aplicarFiltros() {
    const texto = searchInput.value.trim().toLowerCase();
    const rolSeleccionado = roleSelect.value;

    const filtrados = (window.teamMembers || []).filter(member => {
      const coincideTexto =
        !texto ||
        member.name.toLowerCase().includes(texto) ||
        member.role.toLowerCase().includes(texto);

      const coincideRol = !rolSeleccionado || member.role === rolSeleccionado;

      return coincideTexto && coincideRol;
    });

    if (typeof window.renderTeam === "function") {
      window.renderTeam(filtrados);
    }
  }

  searchInput.addEventListener("input", aplicarFiltros);
  roleSelect.addEventListener("change", aplicarFiltros);
});
