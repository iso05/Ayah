let data = ["١–٥ جزء", "٦–١٠ جزء", "١١–١٥ جزء", "١٦–٢٠ جزء", "٢١–٢٥ جزء", "٢٦–٣٠ جزء" ]
let cardGrid = document.querySelector('.card-grid')
let modal = document.getElementById('modal');
let modalTitle = document.getElementById('modalTitle');
let modalBody = document.getElementById('modalBody');
let closeBtn = document.getElementById('closeModal');

for(let i = 0; i < data.length; i++){
  let html = `
  <div class="card" id = "card${i}">${data[i]}</div>
  `
  cardGrid.innerHTML += html;
}

for(let i = 0; i < data.length; i++){
  let card = document.querySelector(`#card${i}`)
    card.addEventListener('click', function(){
    modalTitle.innerText = data[i];         
    modalBody.innerText = `Siz tanlagan pora: ${data[i]}`; 
    modal.style.display = 'flex';            
  })
}

closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});