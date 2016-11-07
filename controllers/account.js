/* eslint-disable semi */
"use strict";

const debug = require('debug')("restful:controllers:account");

function Account(main) {
	debug("init...");

	return {
    'insert': (req, res, next)=> {
			debug(".account called");

      let parametros = req.swagger.params.parametros ? req.swagger.params.parametros.value : null;

      let doc = main.libs.account.insert(parametros);

			res.json({
        'objectCreated': doc
			})
		},
    'search': (req, res, next)=> {
			debug(".accout.search called");

      let mail = req.swagger.params.mail ? req.swagger.params.mail.value : null;
			let busquedas = main.libs.account.search(mail);
			
			console.log('busquedas ' + busquedas);
			res.json({
				'mail': busquedas
			})
		}

	};
}

module.exports = Account;
