"use strict"
const debug = require('debug')("restfulmodel:lib:account");

class Account {
  constructor(main) {
    this.db = main.db;
  }

  insert(parameters) {
    this.db.busquedas.save(parameters,(err, doc) => {
      if (err) return err;

      return doc;
    })
  }

  search(email) {
    let busquedas = {pepe:'12'};
    this.db.busquedas.find({ mail: email }, (err, docs) => {
      if (err) return err;
      debug(docs);
      busquedas = docs;
    })
    debug(busquedas);
    return busquedas;
  }
}

module.exports = Account;
