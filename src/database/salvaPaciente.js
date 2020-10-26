function salvaPaciente(db, paciente) {
    return db.run(`
    INSERT INTO cadastro_pacientes (

        nome,
        documento,
        sexo,
        idade,
        hospital,
        unidade_origem,
        data_chegada,
        tipo_cancer,
        estagio_cancer,
        comentarios_cadastro,
        codigo_emissao_cupom
    )  VALUES (
        "${paciente.nome}",
        "${paciente.documento}",
        "${paciente.sexo}",
        "${paciente.idade}",
        "${paciente.hospital}",
        "${paciente.unidade_origem}",
        "${paciente.data_chegada}",
        "${paciente.tipo_cancer}",
        "${paciente.estagio_cancer}",
        "${paciente.comentarios_cadastro}",
        "${paciente.codigo_emissao_cupom}"
    );
`);
}

module.exports = salvaPaciente;
            