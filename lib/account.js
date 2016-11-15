"use strict"
const debug = require('debug')("restfulmodel:lib:account");

class Account {
  constructor(main) {
    this.db = main.db;
  }

  insert(data) {
    debug('insert called: '+ JSON.stringify(data));
    let email = data.mail;
    data.fecha = new Date();
    delete data.mail;

    return new Promise(( resolve, reject)=>{
      this.db.busquedas.findOne({ mail: email }, (err, doc) => {
        if (err) reject(err);
        debug('update: ' + JSON.stringify(doc));
        if (doc != null){
          this.db.busquedas.update(
              { "mail": email },
              { $set: {count: doc.busquedas.length + 1 }, "$push": { "busquedas": data } },
              (err, doc) =>{
                err? reject(err): resolve(doc);
              }
          );
        }
        else {
          debug('INSERT')
          this.db.busquedas.insert({mail: email, count: 1, busquedas: [data]}, (err, doc)=>{
            err? reject(err): resolve(doc);
          });
        }
        
      })
    });

  }

  search(email) {
    debug('/.*'+email+'.*/')
    return new Promise(( resolve, reject ) => {
      this.db.busquedas.find({ 'mail': { $regex: ".*"+email+".*"}, 'busquedas.fecha': }, (err, docs) => {
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
