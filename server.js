const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PASSWORD = "gariban123";

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.redirect("/door");
});

app.post("/delete", (req, res) => {
  const filePath = path.join(__dirname, "public", "uploads", req.body.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.send("Silinemedi");
    res.redirect("/door");
  });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
