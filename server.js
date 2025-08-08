// static.js
fetch('/products.json')
  .then(res => res.json())
  .then(data => {
    let html = '';
    data.forEach(p => {
      html += `
        <div class="product">
          <img src="${p.image}" alt="${p.name}" onclick="openModal('${p.image}')">
          <strong>${p.name}</strong>
          ${p.price ? `₺${p.price}` : `<em>Teklif Al</em>`}
        </div>
      `;
    });
    document.getElementById('products').innerHTML = html;
  });

function openModal(src) {
  document.getElementById("modalImage").src = src;
  document.getElementById("imageModal").style.display = "block";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}
