
// Mengambil tombol mode
const tombolTema = document.querySelector("#tombolTema");

// Mengambil tema yang tersimpan
const temaTersimpan = localStorage.getItem("tema");

// Mengatur tema saat halaman dibuka
if (temaTersimpan === "gelap") {
    document.body.classList.add("dark-mode");
    tombolTema.textContent = "☀️ Mode Terang";
} else {
    tombolTema.textContent = "🌙 Mode Gelap";
}

// Mengubah tema ketika tombol diklik
tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        tombolTema.textContent = "☀️ Mode Terang";
        localStorage.setItem("tema", "gelap");
    } else {
        tombolTema.textContent = "🌙 Mode Gelap";
        localStorage.setItem("tema", "terang");
    }
});
