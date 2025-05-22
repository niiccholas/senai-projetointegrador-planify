/****************************************************************************
 * Objetivo: API responsável pelas requisições do projeto de gestão de eventos
 * Data: 22/05/2025
 * Autor: Nicolas
 * Versão: 1.0
 * Observações: Para criar a API precisamos instalar:
 *      express     npm install express --save
 *      cors       npm install cors --save
 *      body-parser     npm install body-parser --save
 * 
 * Para criar a conexão com o banco de dados MYSQL precisamos instalar:
 *      prisma      npm install prisma --save
 *      prisma/client       npm install @prisma/client --save
 * 
 * Após a instalação do prisma é necessário inicializar o prisma:
 *      npx prisma init
 * 
 * Para sincronizar o prisma com o banco de dados podemos utilizar:
 *      npx prisma migrate dev
*****************************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Criando o formato de dads que será recebido no body da requisição (POST/PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

//Importando funções da controller

const controllerUsuario = require('./controller/controllerUsuario.js')


app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

app.post('/v1/planify/usuario', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/planify/usuario', cors(), async function(request, response){

    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/planify/usuario/:search_id', cors(), async function(request, response){

    let search_id = request.params.search_id

    let result = await controllerUsuario.buscarUsuario(search_id)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/planify/usuario/:search_id', cors(), async function(request, response){

    let search_id = request.params.search_id

    let result = await controllerUsuario.excluirUsuario(search_id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/planify/usuario/:search_id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let search_id = request.params.search_id

    let result = await controllerUsuario.atualizarUsuario(dadosBody, search_id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.listen('8080', function(){
    console.log('API aguardando requisições...')
})