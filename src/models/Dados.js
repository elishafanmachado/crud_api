const mongoose = require('mongoose');

const Dados = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

mongoose.model('dados', Dados)