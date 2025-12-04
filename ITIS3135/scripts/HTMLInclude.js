document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = async (id, url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    } catch (e) {
      console.error(e);
      document.getElementById(id).innerText =
        `Error loading component: ${id}`;
    }
  };

  // Load header and footer
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
  //loadComponent("header", "/jwatki49/ITIS3135/components/header.html");
  //loadComponent("footer", "/jwatki49/ITIS3135/components/footer.html");

});
