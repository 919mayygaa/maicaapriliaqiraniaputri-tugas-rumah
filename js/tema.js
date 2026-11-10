const tombolTema = document.querySelector("#tombolTema");

if (tombolTema) {
  const temaTersimpan = localStorage.getItem("tema");
  const modeGelapAktif = temaTersimpan === "gelap";

  document.body.classList.toggle("dark-mode", modeGelapAktif);

  function perbaruiTombolTema() {
    const gelapAktif = document.body.classList.contains("dark-mode");
    tombolTema.textContent = gelapAktif ? "☀️ Mode Terang" : "🌙 Mode Gelap";
    tombolTema.setAttribute("aria-pressed", String(gelapAktif));
  }

  perbaruiTombolTema();

  tombolTema.addEventListener("click", () => {
    const gelapAktif = document.body.classList.toggle("dark-mode");
    localStorage.setItem("tema", gelapAktif ? "gelap" : "terang");
    perbaruiTombolTema();
  });
}
