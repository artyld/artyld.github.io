(async function () {
  const CATEGORY_LABELS = {
    com: "Commercial Gamedev Work",
    personal: "Personal Gamedev Stuff",
    cad: "CAD & 3D Printing"
  };

  const file = location.pathname.split("/").pop().replace(".html", "");
  const category = file.split("_")[0].toLowerCase();

  // Wstawia etykietę kategorii na górze artykułu
  const badge = document.getElementById("projectBadge");
  if (badge) {
    badge.className = `badge ${category}`;
    badge.textContent = CATEGORY_LABELS[category] || category;
  }

  // Wstawia wspólny nagłówek i linki z projects.json
  const res = await fetch("../projects.json");
  const data = await res.json();
  const linksHtml = (data.header?.links || [])
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
    .join("");

  document.getElementById("siteHeader").innerHTML = `
    <div class="container">
      <div class="top-bar">
        <a class="back-link" href="../index.html">← Back to Portfolio</a>
        <nav class="nav-links" aria-label="External links">${linksHtml}</nav>
      </div>
    </div>
  `;
})();
