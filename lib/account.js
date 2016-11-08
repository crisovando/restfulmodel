"use strict"
const debug = require('debug')("restfulmodel:lib:account");

class Account {
  constructor(main) {
    this.db = main.db;
  }

  insert(data) {
    debug('insert called: '+JSON.stringify(data));
		let self = this;
		return new Promise(( resolve, reject)=>{
			this.db.users.insert(data, (err, doc)=>{
				err? reject(err) : resolve(doc);
			});
		});
  }

  search(email) {
    return new Promise(( resolve, reject ) => {
      this.db.busquedas.find({ mail: email }, (err, docs) => {
        err? reject(err) : resolve(docs)
      });
    });
  }
}

module.exports = Account;
