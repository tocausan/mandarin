/** database services **/

let mongoDb = require('mongodb'),
    config = require('../config');

// error messages
let errorMessage = {
    connect: 'Connection error',
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
            mongoDb.connect(config.database.path, (err) => {
                if (err) reject(false);
                resolve(true);
            });
        });
    },

    /** drop collection **/
    dropCollection: function (collection) {
        return new Promise((resolve, reject) => {
            this.findAll(collection).then(findResult => {
                if (findResult.length > 0) {
                    mongoDb.MongoClient.connect(config.database.path, (err, db) => {
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
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
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
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
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
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
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
    findOne: function (collection, filter) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                db.collection(collection).findOne(filter, (error, result) => {
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
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                db.collection(collection).find().toArray((error, result) => {
                    if (error) reject(errorMessage.find + error);
                    resolve(result);
                    db.close();
                });
            });
        });
    },

    /** find and update one document **/
    findUpdateOne: function (collection, filter, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(config.database.path, (err, db) => {
                if (err) reject(errorMessage.connect + err);
                db.collection(collection).findOneAndUpdate(filter, {$set: data}, (error, result) => {
                    if (error) reject(errorMessage.find + error);
                    resolve(result);
                    db.close();
                });
            });
        });
    },

    /** find and update or insert one document **/
    findUpdateOrInsertOne: function (collection, filter, data) {
        return new Promise((resolve, reject) => {
            this.findOne(collection, filter).then(findResult => {
                if (findResult) {
                    this.findUpdateOne(collection, filter, data).then(updateResult => {
                        console.log('update');
                        resolve(updateResult);
                    })
                } else {
                    this.insertOne(collection, data).then(insertResult => {
                        console.log('insert');
                        resolve(insertResult);
                    })
                }
            });
        });
    }

};