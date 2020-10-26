const Database = require('./database/db');
const salvaPaciente = require("./database/salvaPaciente");
const atualizaPaciente = require("./database/atualizaPaciente");
const cupomPaciente = require("./database/cupomPaciente");

module.exports = {

	index (req, res) {
		return res.render('index')
	},

	regulamento (req, res) {
		return res.render('regulamento')
	},

	familia (req, res) {
		return res.render('familia')
	},

	cupom (req, res) {
		return res.render('cupom')
	},
	
	login (req, res) {
		return res.render('login')
	},

	cadastroProfissionalSaude (req, res) {
		return res.render('cadastro-profissional-saude')
	},

	cadastroOuUpdate (req, res) {
		return res.render('cadastro-ou-update')
	},

	cadastroPaciente (req, res) {
		return res.render('cadastro-paciente')
	},

	cancerBr (req, res) {
		return res.render('cancer-br')
	},

	updateBusca (req, res) {
		return res.render('update-busca')
	},






	async busca (req, res) {
		const fields = req.body

		console.log(fields)


        try {
      
			const db = await Database
			
			const paciente = await db.all(`SELECT * FROM cadastro_pacientes WHERE documento = "${fields.document}"`)
			
			if (paciente != "") {
			return res.render('update-atualizacao', { paciente })}

			else {
				return res.render('update-busca')
			}
			
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
	},





















	async listaHospitais (req, res) {

        const UF = req.query.id

        try {
            const db = await Database;
			const hospitais = await db.all(`SELECT * FROM hospitais WHERE UF_sigla = "${UF}" order by ranking`)
			
			return res.render('lista-hospitais', { hospitais })
			
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
	},

	dashboard (req, res) {
		return res.render('dashboard')
	},


	async salvaPaciente (req, res) {
		const fields = req.body
		
		const checkFields = {
			nome: fields.name,
			documento: fields.document,
			sexo: fields.gender,
			idade: fields.age,
			unidade_origem: fields.origem,
			data_chegada: fields.arrivalDate,
			tipo_cancer: fields.cancerType,
			estagio_cancer: fields.cancerStage,
		}

        //validar se campos estao preenchidos
        if(Object.values(checkFields).includes('')){
            return res.send('Todos os campos devem ser preenchidos')
        }

		const codigo = Math.floor(Math.random() * 10000000) + 1;  

        try {
            //salvar 
            const db = await Database
            await salvaPaciente(db, {
				nome: fields.name,
				documento: fields.document,
				sexo: fields.gender,
				idade: fields.age,
				hospital: "hospital",
				unidade_origem: fields.origem,
				data_chegada: fields.arrivalDate,
				tipo_cancer: fields.cancerType,
				estagio_cancer: fields.cancerStage,
				comentarios_cadastro: fields.adicionalInfo,
				codigo_emissao_cupom: codigo,
			})

			//redirecionamento
            return res.render('cadastro-ou-update')

        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
    },

	async updateAtualizacao (req, res) {

        const id = req.query.id

        try {
            const db = await Database;
			const results = await db.all(`SELECT * FROM cadastro_pacientes WHERE id = "${id}"`)
			const paciente = results[0]
		  
			return res.render('update-atualizacao', { paciente })
			
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
    },

	async atualizaPaciente (req, res) {
		const fields = req.body

		
		const checkFields = {
			data_final: fields.treatmentFinishDate,
			status_atual: fields.result,
			id: fields.id,
		}

        //validar se campos estao preenchidos
        if(Object.values(checkFields).includes('')){
            return res.send('Todos os campos devem ser preenchidos')
        }

        try {
            //salvar 
            const db = await Database
            await atualizaPaciente(db, {
				id: fields.id,
				data_final: fields.treatmentFinishDate,
				status_atual: fields.result,
				comentarios_atualizacao: fields.adicionaInfo,
			})

			//redirecionamento
            return res.render('cadastro-ou-update')

        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
	},
	

	async cupomPaciente (req, res) {
		const fields = req.body

		
		const checkFields = {
			nome: fields.name,
			codigo_emissao_cupom: fields.codigoEmissao,
		}

        //validar se campos estao preenchidos
        if(Object.values(checkFields).includes('')){
            return res.send('Todos os campos devem ser preenchidos')
        }

		const cupom = Math.floor(Math.random() * 10000000) + 1; 

        try {
            //salvar 
			const db = await Database
			
			const results0 = await db.all(`SELECT * FROM cadastro_pacientes WHERE codigo_emissao_cupom = "${fields.codigoEmissao}" and nome = "${fields.name}"`)
			
			if (results0 != "") {

			const paciente0 = results0[0]
		  
            await cupomPaciente(db, {
				id: paciente0.id,
				cupom: cupom,
			})
			
			const results = await db.all(`SELECT * FROM cadastro_pacientes WHERE codigo_emissao_cupom = "${fields.codigoEmissao}" and nome = "${fields.name}"`)
			const paciente = results[0]
			
			return res.render('cupom', { paciente })}

			else {
				return res.render('familia')
			}
			
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
	},
	


	async loginProfissional(req, res){
		const { email, senha } = req.body

		const db = await Database
		const result = await db.all(`SELECT * FROM profissionais_saude WHERE email = "${email}" and senha = "${senha}"`)

		if(result[0]){
			return res.render('cadastro-ou-update')

		}

		return res.render('login')

	}


	











	
}