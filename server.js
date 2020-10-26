//importando dependencia
const express = require('express');
const path = require('path');
const pages = require('./pages.js');

//iniciando o express
const server = express()
server
    //utilizar body do req
    .use(express.urlencoded({ extended: true}))
    //utilizando os aquivos estaticos
    .use(express.static('public'))

    //configurar template engine
    .set('views', path.join(__dirname,'views'))
    .set('view engine', 'hbs')

//Rotas da aplicacao
server.get('/', pages.index)
server.get('/regulamento', pages.regulamento)
server.get('/familia', pages.familia)
server.get('/cupom', pages.cupom)
server.get('/login', pages.login)
server.get('/cadastro-profissional-saude', pages.cadastroProfissionalSaude)
server.get('/cadastro-ou-update', pages.cadastroOuUpdate)
server.get('/cadastro-paciente', pages.cadastroPaciente)
server.get('/update-busca', pages.updateBusca)
server.get('/update-atualizacao', pages.updateAtualizacao)
server.get('/cancer-br', pages.cancerBr)
server.get('/lista-hospitais', pages.listaHospitais)
server.get('/dashboard', pages.dashboard)
server.post('/salva-paciente', pages.salvaPaciente)
server.post('/atualiza-paciente', pages.atualizaPaciente)
server.post('/emite', pages.cupomPaciente)
server.post('/busca', pages.busca)
server.post('/login-profissional', pages.loginProfissional)


//ligar o servidor
server.listen(5500)

