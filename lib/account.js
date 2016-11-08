"use strict"
const debug = require('debug')("restfulmodel:lib:account");

class Account {
  constructor(main) {
    this.db = main.db;
  }

  insert(data) {
    debug('insert called: '+JSON.stringify(data));
    let email = data.mail;
    delete data.mail;
		return new Promise(( resolve, reject)=>{
      this.db.busquedas.findOne({ mail: email }, (err, doc) => {
        if (err) reject(err);
        console.log('update: ' + doc)
        if (doc != null){
          this.db.busquedas.update(
              { "mail": email },
              { "$push": { "busquedas": data }},
              (err, doc) =>{
                err? reject(err): resolve(doc);
              }
          );
        }
        else {
          this.db.busquedas.insert({mail: email, busquedas: [data]}, (err, doc)=>{
            err? reject(err): resolve(doc);
    			});
        }
        
      })
		});
  }

  search(email) {
    debug('/.*'+email+'.*/')
    return new Promise(( resolve, reject ) => {
      this.db.busquedas.find({ 'mail': { $regex: ".*"+email+".*"} }, (err, docs) => {
        err? reject(err) : resolve(docs)
      });
    });
  }

  remove(email) {
    return new Promise(( resolve, reject ) => {
      this.db.busquedas.remove({ mail: email }, (err, docs) => {
        err? reject(err) : resolve(docs)
      });
    });
  }
}

module.exports = Account;
