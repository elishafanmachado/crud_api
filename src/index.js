const express = require('express');
const mongoose = require('mongoose');

require('./models/Dados')
const Dados = mongoose.model('dados');

mongoose.connect('mongodb://localhost/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
})

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ titulo: "Inicializando a API"})
})

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000/");
})