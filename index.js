const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
	res.render('index');
});

app.get('/especialidade', (req, res)=>{
	
	res.render('especialidade/index');
});

app.get('/Medico', (req, res)=>{
	
		
	/** CHAMADA DO AXIOS **/
	const urlListarEspecialidade = 'http://localhost:3000/especialidade/listarEspecialidade';

	/** 
	PARAMETROS:
	1 - URL DA ROTA
	2 - CALLBACK DA RESPOSTA DA CHAMADA
	**/
axios.get(urlListarEspecialidade)
		.then((response)=>{
			console.log(response.data);
			let especialidades = response.data;
			res.render('medico/index',{especialidades});
		});

});


app.get('/listagemEspecialidades', (req, res)=>{

	/** CHAMADA DO AXIOS **/
	const urlListarEspecialidade = 'http://localhost:3000/especialidade/listarEspecialidade';

	/** 
	PARAMETROS:
	1 - URL DA ROTA
	2 - CALLBACK DA RESPOSTA DA CHAMADA
	**/
axios.get(urlListarEspecialidade)
		.then((response)=>{
			console.log(response.data);
			let especialidades = response.data;
			res.render('especialidade/listagemEspecialidade',{especialidades});
		});
});

/* RECEBE A REQUISIÇÃO DA LISTAGEM */
app.get('/editarEspecialidades/:id', (req, res)=>{

	let {id} = req.params;
	
	const urlSelecionarEspecialidadeID = 
	`http://localhost:3000/especialidade/listarEspecialidade/${id}`;

	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	*/
	axios.get(urlSelecionarEspecialidadeID)
		.then((response)=>{
			let especialidade = response.data;
			console.log(especialidade);
			res.render('especialidade/editarEspecialidade.ejs', {especialidade});
		});
});

/* RECEBE A REQUISIÇÃO DO FORMULÁRIO */
app.post('/editarEspecialidades', (req, res)=>{

	console.log(req.body);

	const urlAlterarEspecialidade = 
	`http://localhost:3000/Especialidade/alterarEspecialidade`;

	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	2 - CORPO DOS DADOS (BODY)
	*/
	axios.put(urlAlterarEspecialidade, req.body)
	.then((response)=>{

		const urlListarEspecialidade = 'http://localhost:3000/especialidade/listarEspecialidade';
		axios.get(urlListarEspecialidade)
			.then((response)=>{
				console.log(response.data);
				let especialidades = response.data;
				res.render('especialidade/listagemEspecialidade',{especialidades});
			});

	});

});

app.get('/excluirEspecialidade/:id', (req, res)=>{

	// console.log('ROTA DE EXCLUSÃO - ID: ' + req.params.id);
	let {id} = req.params;

	const urlExcluirEspecialidade = 
	`http://localhost:3000/especialidade/excluirEspecialidade/${id}`;
	
	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	*/
	axios.delete(urlExcluirEspecialidade)
	.then((response)=>{

		// console.log(response);
		const urlListarEspecialidade = 
		'http://localhost:3000/especialidade/listarEspecialidade';
		
		/*
		PARAMETROS DO AXIOS:
		1 - URL (ROTA)
		*/
		axios.get(urlListarEspecialidade)
		.then((response)=>{
			let especialidades = response.data;
			res.render('especialidade/listagemEspecialidade', {especialidades});
		});

	})

});


	//Médico

app.get('/medico', (req, res)=>{
	
	res.render('medico/index');
});

app.get('/listagemMedico', (req, res)=>{

	const urlListarMedico = 'http://localhost:3000/medico/listarMedico';

	
axios.get(urlListarMedico)
		.then((response)=>{
			console.log(response.data);
			let medicos = response.data;
			res.render('medico/listagemMedico',{medicos});
		});
});
/* RECEBE A REQUISIÇÃO DA LISTAGEM */
app.get('/editarMedicos/:id', (req, res)=>{

	let {id} = req.params;
	
	const urlSelecionarMedicoID = 
	`http://localhost:3000/medico/listarMedicoCodigo/${id}`;

	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	*/
	axios.get(urlSelecionarMedicoID)
		.then((response)=>{
			console.log(response.data);
			let medico = response.data;
			res.render('medico/editarMedico', {medico});
		});
});

/* RECEBE A REQUISIÇÃO DO FORMULÁRIO */
app.post('/editarMedico', (req, res)=>{

	console.log(req.body);

	const urlAlterarMedico = 
	`http://localhost:3000/Medico/editarMedico`;

	
	axios.put(urlAlterarMedico, req.body)
	.then((response)=>{

		const urlListarMedico = 'http://localhost:3000/medico/listarMedico';
		axios.get(urlListarMedico)
			.then((response)=>{
				console.log(response.data);
				let medicos = response.data;
				res.render('medico/listagemMedico',{medicos});
			});

	});

});

app.get('/excluirMedico/:id', (req, res)=>{

	// console.log('ROTA DE EXCLUSÃO - ID: ' + req.params.id);
	let {id} = req.params;

	const urlExcluirMedico = 
	`http://localhost:3000/medico/excluirMedico/${id}`;
	
	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	*/
	axios.delete(urlExcluirMedico)
	.then((response)=>{

		// console.log(response);
		const urlListarMedico = 
		'http://localhost:3000/medico/listarMedico';
		
		/*
		PARAMETROS DO AXIOS:
		1 - URL (ROTA)
		*/
		axios.get(urlListarMedico)
		.then((response)=>{
			let medicos = response.data;
			res.render('medico/listagemMedico', {medicos});
		});

	})

});



app.listen(3001, ()=>{
	console.log('SERVIDOR FRONT-END RODANDO EM http://localhost:3001');
});