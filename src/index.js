const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ titulo: "Inicializando a API"})
})

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000/");
})