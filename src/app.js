const express = require('express') // Chamando o Express

const mongoose = require('mongoose') // Fazendo conexão com o Atlas o banco de dados
require('dotenv').config()

// App
const app = express() // Instanciando a plicação na constante

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Database // Usando o mongoose para criar uma conexão com a connection string do banco de dados
// Adicionou algumas configurações importantes para o funcionamento do mongoose
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindanModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

// Recupera a instância do mongoose.
const db = mongoose.connection
db.on('connected', () => {
    console.log('Mongoose default connection is open')
})

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`)
})

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected')
})

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        )
        process.exit(0)
    })
})

//Load models // Importando os models mentions pra poder ser usado em outras parte do sistema
const Mentions = require('./models/mentions')

// Load routes
const indexRoutes = require('./routes/index-routes')
app.use('/', indexRoutes) // Chamando a primeira rota

const mentionsRoutes = require('./routes/mentions-routes')
app.use('/mentions', mentionsRoutes)

module.exports = app

// https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/