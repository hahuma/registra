function atualizaPaciente(db, paciente) {
    return db.run(`
        UPDATE cadastro_pacientes
        SET data_final = "${paciente.data_final}", status_atual = "${paciente.status_atual}", comentarios_atualizacao = "${paciente.comentarios_atualizacao}"
        WHERE id = "${paciente.id}";   
    `);
}

module.exports = atualizaPaciente;