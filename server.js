app.post("/door", express.json(), (req, res) => {
  const { sifre } = req.body;
  if (sifre === PASSWORD) {
    res.sendFile(path.join(__dirname, "public", "admin-panel.html"));
  } else {
    res.status(401).send("Hatalı şifre! <a href='/door'>Geri dön</a>");
  }
});
