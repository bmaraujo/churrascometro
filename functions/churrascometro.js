'use strict';

const firebase = require('firebase');

var _participantes=0;
var _carnes=;
var _distribuicao;

var _indexCarnes = 0;

class Churrascometro{

	constructor(app){

		let actionMap = new Map();

		actionMap.set('input.welcome', this.welcome.bind(this));
		actionMap.set('input.fazerChurrasco', this.fazerChurrasco.bind(this));
		actionMap.set('input.porcentagemCarnes', this.porcentagemCarnes.bind(this));

		app.handleRequest(actionMap);

		console.log('Constructor <------');
	}

	welcome(app){
		//TODO: obter frase aleatoria de saudação

		let mensagem = 'Olá.<break="weak"/>Vamos fazer um churrasco?<break="weak"/>';

		this.ask(app,mensagem);
	}

	ask(app,mensagem){
		app.ask('<speech>' + mensagem + '</speech>');
	}

	buildSentencaBreakWeak(mensagem){
		return '<s>' + mensagem + '</s><break="weak"/>';
	}

	fazerChurrasco(app){

		_participantes = app.getArgument('totalPessoas');
		let carnes = app.getArgument('carnes');

		descobrirCarnes(carnes);

		app.setContext('distribuicao',5);

		//TODO: obter frase aleatoria deste dialogo
		let mensagem=buildSentencaBreakWeak('Certo, entendi.') + buildSentencaBreakWeak('Você selecionou ' + _carnes.length + ' carnes, vamos agora definir qual porcentagem de cada uma vamos fazer.') + buildSentencaBreakWeak('Quanto você quer servir de ' + _carnes[_indexCarnes++].replace('_',' '));

		this.ask(app, mensagem);
	}

	descobrirCarnes(carnes){
		//Subistitui ' e ' por 'espaço'
		carnes = carnes.replace(' e ', ' ');
		//Substitui ' de ' por '_de_' para ser uma carne so, ex: 'costela de boi', 'coxa de frango', etc
		carnes = carnes.replace(' de ', '_de_');
		//casos unicos
		carnes = carnes.replace('filé mignon', 'filé_mignon');
		carnes = carnes.replace('bife ancho', 'bife_ancho');
		carnes = carnes.replace('coxão duro', 'coxão_duro');
		carnes = carnes.replace('coxão mole', 'coxão_mole');
		carnes = carnes.replace('copa lombo', 'copa_lombo');
		_carnes = carnes.split(' ');
	}

	porcentagemCarnes(app){
		let porcentagem = app.getArgument('porcentagem');
		_distribuicao.push(porcentagem);

		if(_indexCarnes < _carnes.length){

			//TODO obter frase aleatoria deste dialogo
			let mensagem = buildSentencaBreakWeak('Ok.') + buildSentencaBreakWeak('E quanto a ' + _carnes[_indexCarnes++].replace('_', ' '));

			this.ask(app,mensagem);
		}
		else{
			//Distribuição completa, calcular quantos kgs de carne, distribuir

			//trocar contexto
			app.setContext('distribuicao',0); //0 = remove
			app.setContext('finalizar');

		}
	}

}