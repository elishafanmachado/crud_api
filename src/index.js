const express =  require('express');
const mongoose = require('mongoose');

require('./models/index');
const Dados = mongoose.model('dados');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/dadosapi2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((err) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
})

app.get("/", (req, res) => {
    Dados.find({})
        .then((dados) => {
          return res.json(dados);  
        })
        .catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Nenhum artigo encontrado!"
            })
        })
})

app.post("/dados", (req, res) => {
    const dados = Dados.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        });
    });
});

app.get("/dados/:id", (req, res) => {
    Dados.findOne({_id: req.params.id })
        .then((dados) => {
          return res.json(dados);
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Nenhum artigo encontrado!"
            })
        })
})


app.listen(3000, () => {
    console.log("Servidor iniciado com sucesso na porta 3000, http://localhost:3000/")
})