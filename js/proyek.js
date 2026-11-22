let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const filterSemua = document.querySelector("#filter-semua");
const filterHTML = document.querySelector("#filter-html");
const filterCSS = document.querySelector("#filter-css");
const filterJavaScript = document.querySelector("#filter-javascript");
const tombolFilter = [filterSemua, filterHTML, filterCSS, filterJavaScript]
  .filter(Boolean);

function buatKartuProyek(item) {
  const gambar = item.gambar
    ? `<img src="${item.gambar}" alt="${item.alt}" width="${item.width || 560}" height="${item.height || 420}" loading="lazy" decoding="async">`
    : "";

  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      ${gambar}
      <p>${item.deskripsi}</p>
    </article>
  `;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) return;

  daftarProyek.innerHTML = daftar.map(buatKartuProyek).join("");
  jumlahProyek.textContent =
    `Menampilkan ${daftar.length} dari ${proyek.length} proyek.`;
}

async function muatProyek() {
  if (!daftarProyek || !jumlahProyek) return;

  try {
    daftarProyek.innerHTML = "Memuat proyek...";
    const response = await fetch("data/proyek.json", {
      cache: "force-cache"
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);

    proyek = await response.json();
    tampilkanProyek(proyek);
  } catch (error) {
    daftarProyek.innerHTML = "Data proyek gagal dimuat.";
    console.error(error);
  }
}

function aktifkanFilter(tombolDipilih) {
  tombolFilter.forEach((tombol) => {
    tombol.setAttribute("aria-pressed", String(tombol === tombolDipilih));
  });
}

if (daftarProyek && jumlahProyek) {
  muatProyek();

  if (filterSemua) {
    filterSemua.setAttribute("aria-pressed", "true");
    filterSemua.addEventListener("click", () => {
      aktifkanFilter(filterSemua);
      tampilkanProyek(proyek);
    });
  }

  [
    [filterHTML, "HTML"],
    [filterCSS, "CSS"],
    [filterJavaScript, "JavaScript"]
  ].forEach(([tombol, kategori]) => {
    if (tombol) {
      tombol.addEventListener("click", () => {
        aktifkanFilter(tombol);
        tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
      });
    }
  });
}
