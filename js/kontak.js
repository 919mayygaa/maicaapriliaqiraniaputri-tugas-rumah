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
