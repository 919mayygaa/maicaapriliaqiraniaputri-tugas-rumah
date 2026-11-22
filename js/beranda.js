const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  if (!daftarSkill || !jumlahSkill) return;

  try {
    const response = await fetch("data/keahlian.json", {
      cache: "force-cache"
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const skills = await response.json();
    const fragment = document.createDocumentFragment();

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      fragment.appendChild(item);
    });

    daftarSkill.replaceChildren(fragment);
    jumlahSkill.textContent =
      `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

muatKeahlian();
