let data = ["١–٥ جزء", "٦–١٠ جزء", "١١–١٥ جزء", "١٦–٢٠ جزء", "٢١–٢٥ جزء", "٢٦–٣٠ جزء" ];
const juzArabicMap = {
  "١–٥ جزء": [1, 5],
  "٦–١٠ جزء": [6, 10],
  "١١–١٥ جزء": [11, 15],
  "١٦–٢٠ جزء": [16, 20],
  "٢١–٢٥ جزء": [21, 25],
  "٢٦–٣٠ جزء": [26, 30],
};

let cardGrid = document.querySelector('.card-grid');
let modal = document.getElementById('modal');
const generateBtn = document.querySelector('.generate-btn');
const ayatResult = document.getElementById('ayatResult');
let modalTitle = document.getElementById('modalTitle');
let modalBody = document.getElementById('modalBody');
let closeBtn = document.getElementById('closeModal');
let container = document.getElementById('#container');

let selectedRange = null;

for(let i = 0; i < data.length; i++){
  let html = `
  <div class="card" id = "card${i}">${data[i]}</div>
  `
  cardGrid.innerHTML += html;
}
  cardGrid.addEventListener('click', function (e) {
  if (e.target.classList.contains('card')) {
    selectedRange = e.target.innerText.trim(); // Masalan: "١–٥ جزء"
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    ayatResult.innerHTML = ''; // Har safar tozalash
  }
});

generateBtn.addEventListener('click', async function () {
  if (!selectedRange || !juzArabicMap[selectedRange]) return;

  const [startJuz, endJuz] = juzArabicMap[selectedRange];
  const randomJuz = Math.floor(Math.random() * (endJuz - startJuz + 1)) + startJuz;

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/juz/${randomJuz}/ar.alafasy`);
    const data = await res.json();

    const ayatList = data.data.ayahs;
    const randomIndex = Math.floor(Math.random() * ayatList.length);
    const ayah = ayatList[randomIndex]; // ✅ Bu yerda aniqlanmoqda

    // ✅ Faqat shu scope ichida ishlatish kerak
    ayatResult.innerHTML = `
      <p style="font-size: 2rem; text-align: center; margin-top: 30px">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <p style="font-size: 2rem; text-align: center; margin-top: 30px">${ayah.text}</p>
      <hr style="margin: 20px 0;">
      <p style="text-align: center;">📖 <b>${ayah.surah.name}</b> — Oyat: <b>${ayah.numberInSurah}</b></p>
      <p style="text-align: center;">🕋 Juz: ${ayah.juz} — 📄 Page: ${ayah.page}</p>
      <div style="margin-top: 25px; text-align: center;">
        <audio controls style="width: 100%; max-width: 400px;">
          <source src="${ayah.audio}" type="audio/mpeg" />
          Audio eshittirib bo‘lmadi.
        </audio>
      </div>
    `;
  } catch (err) {
    
    ayatResult.innerHTML = `<p style="color:red;">Xatolik yuz berdi. Qayta urinib ko‘ring.</p>`;
    console.error("Fetch error:", err);
  }
});


closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});