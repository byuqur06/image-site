
const tabContainer = document.getElementById("tabs");
const tabContents = document.getElementById("tabContents");

if (tabContainer && tabContents) {
  for (let i = 1; i <= 10; i++) {
    const tab = document.createElement("button");
    tab.className = "tab";
    tab.innerText = `${i}. Ürün`;
    tab.onclick = () => activateTab(i);
    tabContainer.appendChild(tab);

    const content = document.createElement("div");
    content.className = "tab-content";
    content.id = `tab${i}`;
    content.innerHTML = `
      <div class="form-group">
        <label>Ürün Görseli:</label>
        <input type="file" accept="image/*" onchange="previewImage(event, 'preview${i}')">
        <img id="preview${i}" class="preview-img">
      </div>
      <div class="form-group">
        <label>Ürün Adı:</label>
        <input type="text" id="name${i}">
      </div>
      <div class="form-group">
        <label>Fiyat:</label>
        <input type="number" id="price${i}">
      </div>
      <button onclick="saveProduct(${i})">Kaydet</button>
      <div id="message${i}"></div>
    `;
    tabContents.appendChild(content);
  }
}

function activateTab(index) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(c => c.classList.remove("active"));
  document.getElementById(`tab${index}`).classList.add("active");
}

function previewImage(event, previewId) {
  const reader = new FileReader();
  reader.onload = function() {
    const output = document.getElementById(previewId);
    output.src = reader.result;
    output.style.display = 'block';
  };
  reader.readAsDataURL(event.target.files[0]);
}

function openModal(src) {
  document.getElementById("modalImage").src = src;
  document.getElementById("imageModal").style.display = "block";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}
