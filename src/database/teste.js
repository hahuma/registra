const Database = require('./db');
const cupomPaciente = require("./cupomPaciente");
const salvaPaciente = require("./salvaPaciente");
const atualizaPaciente = require("./atualizaPaciente");

Database.then(async (db) => {
    //inserir dados na tabelas
    await salvaPaciente(db,  {
        nome: "ana",
        documento: 123456,
        sexo: "feminino",
        idade: 8,
        hospital: "hospital do RJ",
        unidade_origem: "UPA",
        data_chegada: "2019/02/03",
        tipo_cancer: "tipo 1",
        estagio_cancer: "etagio 2",
        comentarios_cadastro: "sem comentarios",
        codigo_emissao_cupom: 123456789
    })

    await cupomPaciente(db,  {
        id: 2,
        cupom: 987654321
    })

    await atualizaPaciente(db,  {
        id: 2,
        data_final: "2020/04/05",
        status_atual: "curou",
        comentarios_atualizacao: "atualizou o paciente"

    })

    const pacientes = await db.all('SELECT * FROM cadastro_pacientes')
    console.log(pacientes)

})