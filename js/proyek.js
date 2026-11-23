let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const filterSemua = document.querySelector("#filter-semua");
const filterHTML = document.querySelector("#filter-html");
const filterCSS = document.querySelector("#filter-css");
const filterJavaScript = document.querySelector("#filter-javascript");
const tombolFilter = [filterSemua, filterHTML, filterCSS, filterJavaScript]
  .filter(Boolean);
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

function buatKartuProyek(item) {
  const gambar = item.gambar
    ? `<img src="${item.gambar}" alt="${item.alt}" width="${item.width || 560}" height="${item.height || 420}" loading="${item.loading || "lazy"}" decoding="${item.decoding || "async"}">`
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

async function muatRepositori() {
  if (!daftarRepo) return;

  try {
    const response = await fetch(
      "https://api.github.com/users/919mayygaa/repos?sort=updated&per_page=6",
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const repositori = await response.json();
    const daftarTerbaru = repositori
      .filter((repo) => !repo.fork)
      .slice(0, 6);

    if (statusRepo) statusRepo.remove();

    if (daftarTerbaru.length === 0) {
      const kosong = document.createElement("li");
      kosong.textContent = "Belum ada repositori publik.";
      daftarRepo.prepend(kosong);
      return;
    }

    daftarTerbaru.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener noreferrer";
      tautan.textContent = repo.name;
      item.appendChild(tautan);
      daftarRepo.prepend(item);
    });
  } catch (error) {
    if (statusRepo) {
      statusRepo.textContent = "Repositori tidak dapat dimuat sementara.";
    }
    console.error(error);
  }
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

  muatRepositori();

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
