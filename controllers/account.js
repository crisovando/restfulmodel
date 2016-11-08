/* eslint-disable semi */
"use strict";

const debug = require('debug')("restful:controllers:account");

function Account(main) {
	debug("init...");

	return {
    'insert': (req, res, next)=> {
			debug(".account.insert called");

      let parametros = req.swagger.params.parametros ? req.swagger.params.parametros.value : null;

      main.libs.account.insert(parametros)
								.then(busqueda => {
									res.json(busqueda);
								})
								.cath(err => {
									next(err);
								});
		},
    'search': (req, res, next)=> {
			debug(".accout.search called");

      let mail = req.swagger.params.mail ? req.swagger.params.mail.value : null;
			main.libs.account.search(mail)
								.then(busquedas => {
									res.json(busquedas);
								})
								.cath(err => {
									debug(".account.search.error: " + err);
									next(err);
								});
		}

	};
}

module.exports = Account;
