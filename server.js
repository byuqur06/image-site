const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PASSWORD = "gariban123";
const DATA_FILE = path.join(__dirname, "products.json");

app.get("/door", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin-login.html"));
});

app.post("/door", (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.sendFile(path.join(__dirname, "public", "admin-panel.html"));
  } else {
    res.send("Hatalı şifre! <a href='/door'>Geri dön</a>");
  }
});

app.post("/add", (req, res) => {
  const { name, price, image } = req.body;
  const products = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : [];
  const id = products.length + 1;
  products.push({ id, name, price, image });
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  res.redirect("/door");
});

app.get("/products.json", (req, res) => {
  const products = fs.existsSync(DATA_FILE) ? fs.readFileSync(DATA_FILE) : "[]";
  res.setHeader("Content-Type", "application/json");
  res.send(products);
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});