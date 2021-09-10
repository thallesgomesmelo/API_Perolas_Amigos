// Criado os métodos que irão criar e listar os dados do banco de dados
const mongoose = require('mongoose') // Importa o mongoose 
const Mentions = mongoose.model('Mentions') // Referenciando model Mentions para poder utilizar os métodos no controller
const repository = require('../repositories/mentions-repository')

// List 
/* Método que listagem de dados, função assíncrona 
que aguarda a chamada de Mentins.find(), quando achar algo ele vai armazenar em data.*/
exports.listMentions = async (req, res) => {
    try{
        const data = await repository.listMentions()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({message: 'Falha ao carregar as menções.'})
    }
}

// Create
/* Método de inserção de dados, cria uma instância de Mentions 
e passa para o modelo os dados que recebe via req.body*/
exports.createMention = async (req, res) => {
    try {
        await repository.createMention({
            friend: req.body.friend,
            mention: req.body.mention
        })

        res.status(201).send({message: 'Menção cadastrada com sucesso!'})
    } catch (e) {
        res.status(500).send({message: 'Falha ao cadastrar a menção.'})
    }
}