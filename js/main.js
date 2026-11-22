// JavaScript untuk fitur Beranda, Proyek, dan Kontak.
// File dimuat dengan defer pada halaman yang menggunakan fitur-fitur ini.


// 1. Daftar keahlian (halaman Beranda), data dari
// data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const skills = await response.json();

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}


if (daftarSkill) {
  muatKeahlian();
}


// Kontak: perbarui penghitung karakter pesan.
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
const peringatanPesan = document.querySelector("#peringatan-pesan");
const tombolKosongkanPesan = document.querySelector(".tombol-kedua");

if (kotakPesan && hitungKarakter && peringatanPesan) {
  const perbaruiHitungKarakter = () => {
    const jumlahKarakter = kotakPesan.value.length;
    const hampirPenuh = jumlahKarakter >= 250;

    hitungKarakter.textContent = `${jumlahKarakter}/300 karakter`;
    hitungKarakter.classList.toggle("hampir-penuh", hampirPenuh);
    peringatanPesan.hidden = !hampirPenuh;
    peringatanPesan.textContent = hampirPenuh
      ? "Peringatan: pesan sudah mencapai 250 karakter."
      : "";
  };

  kotakPesan.addEventListener("input", perbaruiHitungKarakter);
  perbaruiHitungKarakter();

  if (tombolKosongkanPesan) {
    tombolKosongkanPesan.addEventListener("click", () => {
      kotakPesan.value = "";
      perbaruiHitungKarakter();
      kotakPesan.focus();
    });
  }
}

// Proyek: data dan fungsi untuk menampilkan serta memfilter kartu proyek.
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const filterSemua = document.querySelector("#filter-semua");
const filterHTML = document.querySelector("#filter-html");
const filterCSS = document.querySelector("#filter-css");
const filterJavaScript = document.querySelector("#filter-javascript");
const tombolFilter = [
  filterSemua,
  filterHTML,
  filterCSS,
  filterJavaScript,
].filter(Boolean);

function buatKartuProyek(item) {
  const gambar = item.gambar
    ? `<img src="${item.gambar}" alt="${item.alt}" width="${item.width || 280}" height="${item.height || 210}" loading="${item.loading || "lazy"}" decoding="${item.decoding || "async"}">`
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
  if (!daftarProyek || !jumlahProyek) {
    return;
  }

  daftarProyek.innerHTML = daftar.map(buatKartuProyek).join("");
  daftarProyek.querySelectorAll("article.kartu").forEach((kartu, indeks) => {
    const gambar = kartu.querySelector("img");
    if (!gambar) return;

    gambar.addEventListener("error", () => {
      gambar.removeAttribute("srcset");
      if (daftar[indeks].judul === "Tabel Jadwal Belajar") {
        gambar.src = "img/jadwal.jpg";
      }
    }, { once: true });
  });
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek.`;
}

async function muatProyek() {
    try {
        daftarProyek.innerHTML = "Memuat proyek...";

        const response = await fetch("data/proyek.json", {
          cache: "force-cache"
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data proyek");
        }

        proyek = await response.json();

        tampilkanProyek(proyek);
    } catch (error) {
        daftarProyek.innerHTML = "Data proyek gagal dimuat.";
        console.error(error);
    }
}

if (daftarProyek && jumlahProyek) {
  muatProyek();
  if (filterSemua) {
    filterSemua.setAttribute("aria-pressed", "true");
  }

  const tampilkanKategori = (kategori) => {
    const proyekKategori = proyek.filter((item) => item.kategori === kategori);
    tampilkanProyek(proyekKategori);
  };

  const aktifkanFilter = (tombolDipilih) => {
    tombolFilter.forEach((tombol) => {
      tombol.setAttribute("aria-pressed", String(tombol === tombolDipilih));
    });
  };

  if (filterSemua) {
    filterSemua.addEventListener("click", () => {
      aktifkanFilter(filterSemua);
      tampilkanProyek(proyek);
    });
  }

  if (filterHTML) {
    filterHTML.addEventListener("click", () => {
      aktifkanFilter(filterHTML);
      tampilkanKategori("HTML");
    });
  }

  if (filterCSS) {
    filterCSS.addEventListener("click", () => {
      aktifkanFilter(filterCSS);
      tampilkanKategori("CSS");
    });
  }

  if (filterJavaScript) {
    filterJavaScript.addEventListener("click", () => {
      aktifkanFilter(filterJavaScript);
      tampilkanKategori("JavaScript");
    });
  }
}


// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "919mayygaa";

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

function tampilkanTautanRepositori() {
  if (!daftarRepo || !statusRepo) return;

  const item = document.createElement("li");
  const tautan = document.createElement("a");

  tautan.href = `https://github.com/${username}`;
  tautan.target = "_blank";
  tautan.rel = "noopener noreferrer";
  tautan.textContent = "Lihat semua repositori di GitHub";

  item.appendChild(tautan);
  daftarRepo.replaceChildren(item);
  statusRepo.textContent = "Repositori GitHub Maica:";
}

if (daftarRepo && statusRepo) {
  tampilkanTautanRepositori();
}




