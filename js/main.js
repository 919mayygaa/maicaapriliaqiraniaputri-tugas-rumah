// JavaScript untuk fitur Beranda, Proyek, dan Kontak.
// File dimuat dengan defer pada halaman yang menggunakan fitur-fitur ini.

// Beranda: tampilkan daftar keahlian.
const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "Desain poster dengan Canva", level: "Mahir" },
  { nama: "JavaScript", level: "Dasar" },
];

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill) {
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} - ${skill.level}`;
    daftarSkill.appendChild(item);
  });
}

if (jumlahSkill) {
  jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
}

// Kontak: perbarui penghitung karakter pesan.
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  const perbaruiHitungKarakter = () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  };

  kotakPesan.addEventListener("input", perbaruiHitungKarakter);
  perbaruiHitungKarakter();
}

// Proyek: data dan fungsi untuk menampilkan serta memfilter kartu proyek.
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/proyek-profil-maica.png",
    alt: "Tangkapan layar halaman profil Maica Aprilia Qirania Putri",
    deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/proyek-kontak.png",
    alt: "Tangkapan layar form kontak berisi lima isian",
    deskripsi: "Form dengan label dan validasi bawaan browser.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/jadwal.png",
    alt: "Tangkapan layar tabel jadwal belajar mandiri",
    deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "img/perbandingan Desain Portofolio Maica.png",
    deskripsi: "Tampilan responsif untuk ponsel, tablet, dan laptop.",
  },
  {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    gambar: "img/latihan.js.png",
    alt: "Tangkapan layar kalkulator nilai rapor",
    deskripsi: "Menghitung rata-rata dan predikat nilai dengan JavaScript.",
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    gambar: "img/logika.js.png",
    alt: "Tangkapan layar lima soal logika",
    deskripsi: "Lima fungsi logika yang diuji dengan beberapa masukan.",
  },
];

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
    ? `<img src="${item.gambar}" alt="${item.alt}" width="280">`
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
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek.`;
}

if (daftarProyek && jumlahProyek) {
  tampilkanProyek(proyek);
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
