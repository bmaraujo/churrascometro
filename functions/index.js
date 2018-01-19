'use strict';

process.env.DEBUG = 'actions-on-google:*';
const {DialogflowApp} = require('actions-on-google');
const functions = require('firebase-functions');

exports.testProfiling = functions.https.onRequest((request, response) => {

	const app = new DialogflowApp({request, response});
	const churrascometro = new Churrascometro(app);

 });
