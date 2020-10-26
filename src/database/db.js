const Database = require('sqlite-async');

function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS cadastro_pacientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            documento INTEGER,
            sexo TEXT,
            idade INTEGER,
            hospital TEXT,
            unidade_origem TEXT,
            data_chegada DATE,
            tipo_cancer TEXT,
            estagio_cancer TEXT,
            comentarios_cadastro TEXT,
            codigo_emissao_cupom INTEGER,
            cupom INTEGER,
            data_final DATE,
            status_atual TEXT,
            comentarios_atualizacao TEXT 
        );

        CREATE TABLE IF NOT EXISTS profissionais_saude (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            senha TEXT,
            hospital TEXT    
        ); 

        CREATE TABLE IF NOT EXISTS hospitais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            UF TEXT,
            UF_sigla TEXT,
            ranking INTEGER    
        );      
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)