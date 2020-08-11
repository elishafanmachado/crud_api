const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('./models/index');
const Dados =  mongoose.model('dados')
mongoose.connect('mongodb://localhost/apiteste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch(() => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
})

app.use(express.json());

app.get("/", (req, res) => {
    Dados.find({})
        .then((dados) => {
            return res.json(dados);
        })
        .catch((erro) => {
            res.status(400).json({
                error: true,
                message: "Nenhum dado encontrado!"
         });
    });
});

app.post("/dados", (req, res) => {
    const dados =  Dados.create(req.body, (err) => {
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
    const dados = Dados.findOne({ _id: req.params.id })
        .then((dados) => {
            return res.json(dados)
        })
        .catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Nenhum artigo encontrado!"
        });
    });
});

app.put("/dados/:id", (req, res) => {
    const dados = Dados.updateOne( { _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi editado com sucesso!"
        });

        return res.status(200).json({
            error: false,
            message: "Artigo editado com sucesso!"
        })
    
    });
});

app.delete("/dados/:id", (req, res) => {
    const dados =  Dados.deleteOne( { _id: req.params.id }, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi excluido com sucesso!"
        });

        return res.status(200).json({
            error: false,
            message: "Artigo excluido com sucesso!"
        });
    });        
});

app.listen(3000, () => {
    console.log("Servidor iniciado com sucesso na porta 3000 http://localhost:3000/");
});