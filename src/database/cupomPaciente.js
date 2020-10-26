function cupomPaciente(db, paciente) {
    return db.run(`
        UPDATE cadastro_pacientes
        SET cupom = "${paciente.cupom}"
        WHERE id = "${paciente.id}";   
    `);
}

module.exports = cupomPaciente;