/* =========================================================
   PANTALLA: BÚSQUEDA
   ========================================================= */

/* Aplica texto, categoría y orden a la lista de especialistas */
function filteredSpecialists() {
  const { query, category, sortBy } = state.search;
  const q = query.toLowerCase();

  return specialists
    .filter((sp) => {
      const matchesQuery =
        !q ||
        sp.name.toLowerCase().includes(q) ||
        sp.trade.toLowerCase().includes(q) ||
        sp.location.toLowerCase().includes(q);

      let matchesCat = true;
      if (category !== "all") {
        const cat = categories.find((c) => c.id === category);
        matchesCat = cat ? sp.trade.toLowerCase().includes(cat.label.toLowerCase().slice(0, 5)) : true;
      }
      return matchesQuery && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.rate - b.rate;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });
}

function renderBusqueda() {
  const { query, category, sortBy } = state.search;

  const chips = [{ id: "all", label: "Todos", icon: "" }, ...categories]
    .map(
      (cat) => `
      <button class="chip ${category === cat.id ? "is-active" : ""}" data-action="set-category" data-category="${cat.id}">
        ${cat.icon ? cat.icon + " " : ""}${cat.label}
      </button>`
    )
    .join("");

  return `
    <div class="page-header page-header--sticky">
      <h2 class="page-title" style="margin-bottom:14px">Encuentra un especialista</h2>

      <div class="search-box">
        ${icons.search(16)}
        <input id="search-input" type="text" placeholder="Plomero, electricista, limpieza…" value="${esc(query)}">
        <button id="search-clear" class="search-box__clear" data-action="clear-search" ${query ? "" : "hidden"}>×</button>
      </div>

      <div class="chips">${chips}</div>
    </div>

    <div class="results">
      <div class="results__bar">
        <span id="results-count" class="results__count"></span>
        <select id="sort-select" class="sort-select">
          <option value="rating" ${sortBy === "rating" ? "selected" : ""}>Mejor calificados</option>
          <option value="reviews" ${sortBy === "reviews" ? "selected" : ""}>Más reseñas</option>
          <option value="price" ${sortBy === "price" ? "selected" : ""}>Menor precio</option>
        </select>
      </div>
      <div id="results-list"></div>
    </div>`;
}

/* Repinta solo la lista (para no perder el foco del buscador al escribir) */
function updateSearchResults() {
  const list = filteredSpecialists();
  document.getElementById("results-count").textContent = `${list.length} resultados`;
  document.getElementById("search-clear").hidden = !state.search.query;
  document.getElementById("results-list").innerHTML = list.length
    ? `<div class="card-list">${list.map(specialistCard).join("")}</div>`
    : `<div class="empty">
         <div class="empty__emoji">🔍</div>
         <p>Sin resultados para "${esc(state.search.query)}"</p>
       </div>`;
}
