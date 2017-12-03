/** database services **/

let mongoDb = require('mongodb'),
    databaseConfig = require('../config/database');

// error messages
let errorMessage = {
    connect: 'Connection error \n',
    drop: 'Drop error \n',
    insert: 'Insert error \n',
    find: 'Find error \n',
    alreadyExist: 'Already exist \n',
    emptyCollection: 'Empty collection \n'
};

module.exports = {

    /** check connection **/
    checkConnection: function () {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                resolve('database available');
                db.close();
            });
        });
    },

    /** drop collection **/
    dropCollection: function (collection) {
        return new Promise((resolve, reject) => {
            this.findAll(collection).then(findResult => {
                if(findResult.length > 0){
                    mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                        if (err) reject(errorMessage.connect + err);
                        db.collection(collection).drop((error, result) => {
                            if (error) reject(errorMessage.drop + error);
                            resolve(result);
                            db.close();
                        });
                    });
                }
                resolve(errorMessage.emptyCollection);
            });
        });
    },

    /** insert many documents **/
    insertMany: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                db.collection(collection).insertMany(data, (error, result) => {
                    if (error) reject(errorMessage.insert + error);
                    resolve(result);
                    db.close();
                });
            });
        });
    },

    /** insert one document **/
    insertOne: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                db.collection(collection).insertOne(data, (error, result) => {
                    if (error) reject(errorMessage.insert + error);
                    resolve(result);
                    db.close();
                });
            });
        });
    },

    /** insert one documents if not exist **/
    insertOneIfNotExist: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                this.findOne(collection, data).then(findResult => {
                    if (!findResult) {
                        this.insertOne(collection, data).then(insertResult => {
                            resolve(insertResult);
                        })
                    }
                    db.close();
                });
            });
        });
    },

    /** find one document **/
    findOne: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                db.collection(collection).findOne(data, (error, result) => {
                    if (error) reject(errorMessage.find + error);
                    resolve(result);
                    db.close();
                });
            });
        });
    },

    /** find all documents **/
    findAll: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                db.collection(collection).find().toArray((error, result) => {
                    if (error) reject(errorMessage.find + error);
                    resolve(result);
                    db.close();
                });
            });
        });
    }
};