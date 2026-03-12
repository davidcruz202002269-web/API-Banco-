const express = require("express");
const app = express();

app.use(express.json());

let bancos = [
  {
    id: 1,
    nombre: "Banco Popular",
    personas: [
      { id: 1, nombre: "Juan", cuenta: "001" },
      { id: 2, nombre: "Maria", cuenta: "002" }
    ]
  },
  {
    id: 2,
    nombre: "Banco Reservas",
    personas: [
      { id: 1, nombre: "Pedro", cuenta: "00352665565" }
    ]
  }
];

app.get("/", (req, res) => {
  res.send('Bienvenido al banco');
});

app.get("/banco", (req, res) => {
  res.json(bancos);
});

app.get("/banco/:id", (req, res) => {
  const banco = bancos.find(b => b.id == req.params.id);
  res.json(banco);
});

app.get("/banco/:id/personas", (req, res) => {
  const banco = bancos.find(b => b.id == req.params.id);
  res.json(banco.personas);
});

app.get("/banco/:id/personas/:pid", (req, res) => {
  const banco = bancos.find(b => b.id == req.params.id);
  const persona = banco.personas.find(p => p.id == req.params.pid);
  res.json(persona);
});

app.post("/banco", (req, res) => {

  const nuevoBanco = {
    id: bancos.length + 1,
    nombre: req.body.nombre,
    personas: []
  };

  bancos.push(nuevoBanco);

  res.json({
    mensaje: "Banco agregado",
    banco: nuevoBanco
  });
});

app.post("/banco/:id/personas", (req, res) => {

  const banco = bancos.find(b => b.id == req.params.id);

  const nuevaPersona = {
    id: banco.personas.length + 1,
    nombre: req.body.nombre,
    cuenta: req.body.cuenta
  };

  banco.personas.push(nuevaPersona);

  res.json({
    mensaje: "Persona agregada",
    persona: nuevaPersona
  });
});

app.put("/banco/:id/personas/:pid", (req, res) => {

  const banco = bancos.find(b => b.id == req.params.id);
  const persona = banco.personas.find(p => p.id == req.params.pid);

  persona.nombre = req.body.nombre;
  persona.cuenta = req.body.cuenta;

  res.json({
    mensaje: "Persona actualizada",
    persona
  });
});

app.delete("/banco/:id/personas/:pid", (req, res) => {

  const banco = bancos.find(b => b.id == req.params.id);

  banco.personas = banco.personas.filter(
    p => p.id != req.params.pid
  );

  res.json({
    mensaje: "Persona eliminada"
  });
});

const puerto = 3000

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});