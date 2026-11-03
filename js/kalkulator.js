const formKalkulator = document.querySelector("#form-kalkulator");
const hasilKalkulator = document.querySelector("#hasil-kalkulator");

formKalkulator.addEventListener("submit", (event) => {
	event.preventDefault();

	const nilaiTugas = Number(document.querySelector("#nilai-tugas").value);
	const nilaiUts = Number(document.querySelector("#nilai-uts").value);
	const nilaiUas = Number(document.querySelector("#nilai-uas").value);
	const nilaiAkhir = (nilaiTugas + nilaiUts + nilaiUas) / 3;

	let predikat;
	if (nilaiAkhir >= 90) {
		predikat = "A";
	} else if (nilaiAkhir >= 80) {
		predikat = "B";
	} else if (nilaiAkhir >= 70) {
		predikat = "C";
	} else {
		predikat = "D";
	}

	const status = nilaiAkhir >= 75 ? "Lulus KKM" : "Belum lulus KKM";
	const formatNilai = new Intl.NumberFormat("id-ID", {
		maximumFractionDigits: 2,
	}).format(nilaiAkhir);

	hasilKalkulator.textContent = `Nilai akhir: ${formatNilai} | Predikat: ${predikat} | ${status}`;
	hasilKalkulator.hidden = false;
});
