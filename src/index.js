const express = require('express');
const mongoose = require('mongoose');

require('./models/Dados')
const Dados = mongoose.model('dados');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
})


app.get("/", (req, res) => {
    return res.json({ titulo: "Inicializando a API"})
})

app.post("/dados", (req, res) => {
    const dados = Dados.create(req.body, (err) => {
        if(err) return res.status(400).json({
            erro: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    });
});


app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000/");
})