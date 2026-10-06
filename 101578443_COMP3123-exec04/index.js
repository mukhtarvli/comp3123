const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use(express.static("public"));


app.get("/hello", (req, res) => {
  res.type("text/plain").send("Hello Express JS");
});


app.get("/user", (req, res) => {

  const firstname = req.query.firstname || "Mukhtar";
  const lastname = req.query.lastname || "Ali";

  res.json({ firstname, lastname });
});


app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;

  res.json({ firstname, lastname });
});


app.post("/users", (req, res) => {
  const users = Array.isArray(req.body) ? req.body : [];

  res.json(users);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});