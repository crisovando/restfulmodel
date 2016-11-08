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
      console.log(self);
			self.db.busquedas.insert(data, (err, doc)=>{
        err? reject(err): resolve(doc);
			});
		});
  }

  search(email) {
    let self = this;
    return new Promise(( resolve, reject ) => {
      self.db.busquedas.find({ mail: email }, (err, docs) => {
        err? reject(err) : resolve(docs)
      });
    });
  }
}

module.exports = Account;
